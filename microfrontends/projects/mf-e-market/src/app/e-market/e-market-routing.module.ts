import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EMarketComponent } from './e-market.component';

const routes: Routes = [{ path: '', component: EMarketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EMarketRoutingModule {}
