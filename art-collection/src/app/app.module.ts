import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './core/components/nav/nav.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import {CollectionModule} from "./features/collection/collection.module";
import { GlobalLoaderComponent } from './core/components/global-loader/global-loader.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoaderInterceptor} from "./core/interceptor/loader.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    GlobalLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollectionModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
