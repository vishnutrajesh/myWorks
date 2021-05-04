import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RootComponent} from './root/root.component';
import {ScrollMagicComponent} from './scroll-magic/scroll-magic.component';


const routes: Routes = [
  {path: '', component: RootComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'scroll', component: ScrollMagicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
