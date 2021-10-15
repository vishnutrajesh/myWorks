import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  imageUpload: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.imageUpload = new FormGroup({
      files: new FormControl(null)
    })
  }

  uploadFiles() {

  }
}
