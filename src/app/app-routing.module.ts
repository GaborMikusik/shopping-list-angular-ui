import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListGridComponent } from './main/shopping-list-grid/shopping-list-grid.component';

const routes: Routes = [
  { path: '', component: ShoppingListGridComponent },
  { path: 'account', loadChildren: () => import('./account/module/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
