import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";
import {ListComponent} from "./features/collection/list/list.component";
import {ListPageComponent} from "./features/collection/list-page/list-page.component";
import {ArtDetailsComponent} from "./art-details/art-details.component";
import {ProtectedComponent} from "./protected/protected.component";
import {ProtectGuard} from "./protect.guard";

const routes: Routes = [
  /* Lazy loaded route for listing */
  {
    path: "", component: ListComponent, children: [
      {path: '', redirectTo: 'page/1', pathMatch: 'full'},
      {path: 'page/:no', component: ListPageComponent}
    ]
  },
  {path: 'art/:id', component: ArtDetailsComponent},
  {path: 'protected', component: ProtectedComponent, canActivate: [ProtectGuard]},
  /* Wildcard Route */
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
