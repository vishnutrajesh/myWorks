import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";

const routes: Routes = [
  /* Lazy loaded route for listing */
  {
    path: "collections", loadChildren: () => import('./features/collection/collection.module').then(m => m.CollectionModule)
  },
  {
    path: "", redirectTo: "collections", pathMatch: "full"
  },
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
