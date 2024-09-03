import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EMarketRoutingModule} from './e-market-routing.module';
import {EMarketComponent} from './e-market.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { CartService } from '../../service/cart.service';

@NgModule({
    declarations: [EMarketComponent],
    imports: [CommonModule, EMarketRoutingModule, HttpClientModule, FormsModule],
    providers: [DataService, CartService]
})
export class EMarketModule {
}
