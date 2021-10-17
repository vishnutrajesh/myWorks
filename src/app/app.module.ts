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
import { CovidChartComponent } from './covid-chart/covid-chart.component';
import {NgxEchartsModule} from "ngx-echarts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {DatePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    DragNDropComponent,
    FileUploadComponent,
    FileCardComponent,
    CovidChartComponent
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
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
