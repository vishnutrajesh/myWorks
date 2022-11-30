import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './core/components/post/post.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { GlobalLoaderComponent } from './core/components/global-loader/global-loader.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoaderInterceptor} from "./core/interceptor/loader.interceptor";
import {CarouselModule} from "primeng/carousel";
import {AvatarModule} from "primeng/avatar";
import {AvatarGroupModule} from "primeng/avatargroup";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PageNotFoundComponent,
    GlobalLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    AvatarModule,
    AvatarGroupModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
