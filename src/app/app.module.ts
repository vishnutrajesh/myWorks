import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RootComponent } from './root/root.component';
import { ScrollMagicComponent } from './scroll-magic/scroll-magic.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    RootComponent,
    ScrollMagicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
