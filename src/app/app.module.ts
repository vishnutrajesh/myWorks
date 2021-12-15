import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { UserListComponent } from './components/user-list/user-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NameShortnerDirective } from './directives/name-shortner.directive';
import {LoaderInterceptor} from "./http/loader.interceptor";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ModalPopupComponent,
    UserListComponent,
    NameShortnerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
