import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import {CollectionRoutingModule} from "./collection.routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ImageUrlPipe} from "../../core/pipes/image-url.pipe";
import {PaginatorComponent} from "../../core/components/paginator/paginator.component";
import {SelectComponent} from "../../core/components/select/select.component";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        ListComponent,
        ImageUrlPipe,
        PaginatorComponent,
        SelectComponent
    ],
  exports: [
    PaginatorComponent,
    ListComponent,
    ImageUrlPipe
  ],
    imports: [
        CommonModule,
        CollectionRoutingModule,
        HttpClientModule,
        FormsModule
    ]
})
export class CollectionModule { }
