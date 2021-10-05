import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {finalize, tap} from "rxjs/operators";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  imageUpload: FormGroup;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  percentage: any = [];
  snapshot: any = new Observable();
  downloadURL: string;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.imageUpload = new FormGroup({
      files: new FormControl(null)
    })
  }

  startUpload() {
  const fileList = this.imageUpload.get('files')?.value;
  if (fileList && fileList.length > 0) {
    Array.from(fileList).forEach((file: any, i: number) => {
      // The storage path
      const path = `test/${Date.now()}_${file.name}`;

      // Reference to storage bucket
      const ref = this.storage.ref(path);

      // The main task
      this.task = this.storage.upload(path, file);

      // Progress monitoring
      this.percentage[i] = this.task.percentageChanges();
      console.log('percentage', this.percentage[i]);

      this.snapshot[i] = this.task.snapshotChanges().pipe(
        tap(console.log),
        // The file's download URL
        finalize( async() =>  {
          this.downloadURL = await ref.getDownloadURL().toPromise();

          this.db.collection('files').add( { downloadURL: this.downloadURL, path });
        }),
      );
    })
  }
  }
  isActive(snapshot: { state: string; bytesTransferred: number; totalBytes: number; }) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  uploadFiles() {
    this.startUpload()
    console.log(this.imageUpload.get('files')?.value);
  }
}
