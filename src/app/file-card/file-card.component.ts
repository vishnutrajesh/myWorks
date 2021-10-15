import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {finalize, tap} from "rxjs/operators";

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit {
  @Input() file: any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  percentage$: Observable<any>;
  snapshot: Observable<any>;
  downloadURL: string;
  invalidBlockRemove: boolean;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit(): void {
    if (!this.invalidFile(this.file)) {
      this.startUpload();
    }
  }

  decimalAvoid(val: any) {
    return Number(val).toFixed();
  }

  invalidFile(fileList: any): boolean {
    return fileList.type !== 'image/png' && fileList.type !== 'image/jpeg' && fileList.type !== 'image/jpg'
  }

  startUpload() {

    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage$ = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }

  isActive(snapshot: { state: string; bytesTransferred: number; totalBytes: number; }) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  humanFileSize(size: any) {
    let  i = Math.floor( Math.log(size) / Math.log(1024) );
    const fileSize: any = ( size / Math.pow(1024, Number(i)) ).toFixed(2);
    return fileSize * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  };

}
