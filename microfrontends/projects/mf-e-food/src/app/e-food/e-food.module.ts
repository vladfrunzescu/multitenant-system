import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EFoodRoutingModule} from './e-food-routing.module';
import {EFoodComponent} from './e-food.component';
import {HttpClientModule} from "@angular/common/http";
import { DataService } from '../../service/data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [EFoodComponent],
    imports: [CommonModule, EFoodRoutingModule, HttpClientModule, FormsModule],
    providers: [DataService]
})
export class EFoodModule {
}
