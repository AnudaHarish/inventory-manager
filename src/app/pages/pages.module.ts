import { NgModule } from '@angular/core';
import {NbAutocompleteModule, NbButtonModule, NbCardModule, NbInputModule, NbMenuModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SalesComponent } from './sales/sales.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    NotFoundComponent,
    SalesComponent,
    InventoryComponent,
  ],
})
export class PagesModule {
}
