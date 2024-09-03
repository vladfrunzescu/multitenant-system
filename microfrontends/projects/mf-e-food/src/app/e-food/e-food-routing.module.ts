import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EFoodComponent } from './e-food.component';

const routes: Routes = [{ path: '', component: EFoodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EFoodRoutingModule {}
