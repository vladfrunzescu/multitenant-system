import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentRoutingModule as PaymentRoutingModule} from './payment-routing.module';
import {PaymentComponent} from './payment.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [PaymentComponent],
    imports: [CommonModule, PaymentRoutingModule, HttpClientModule, FormsModule],
    providers: []
})
export class PaymentModule {
}
