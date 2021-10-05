import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DragNDropComponent} from "./drag-n-drop/drag-n-drop.component";

const routes: Routes = [
  {path: 'drag-n-drop', component: DragNDropComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
