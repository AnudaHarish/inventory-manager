import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SalesComponent} from './sales/sales.component';
import {InventoryComponent} from './inventory/inventory.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'sales',
      component: SalesComponent,
    },
    {
      path: 'inventory',
      component: InventoryComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}


// {
//   path: 'layout',
//     loadChildren: () => import('./layout/layout.module')
//   .then(m => m.LayoutModule),
// }
