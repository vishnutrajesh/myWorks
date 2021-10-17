import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {CovidChartComponent} from "./covid-chart/covid-chart.component";

const routes: Routes = [
  {path: 'file-upload', component: FileUploadComponent },
  {path: 'covid-chart', component: CovidChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
