import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragNDropComponent } from './drag-n-drop/drag-n-drop.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { FileCardComponent } from './file-card/file-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DragNDropComponent,
    FileUploadComponent,
    FileCardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
      AngularFireModule.initializeApp({
        apiKey: "AIzaSyBCQNthrSAQxgZqUrzlMZQyf9AKesUjWXM",
        authDomain: "vtr-dev-ui.firebaseapp.com",
        storageBucket: "vtr-dev-ui.appspot.com",
        projectId: "vtr-dev-ui",
      }),
      AngularFireStorageModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
