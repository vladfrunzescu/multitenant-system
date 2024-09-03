import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EFood} from "../../model/e-food.model";
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../model/cart-item.model';
import { DataService } from '../../service/data.service';

@Component({
    selector: 'app-e-food',
    templateUrl: './e-food.component.html',
    styleUrls: ['./e-food.component.scss'],
})
export class EFoodComponent implements OnInit {

    foods: EFood[] = [];
    filteredFoods: EFood[] = [];

    categories: string[] = [];
    searchText: string = '';

    cart: CartItem[] = [];

    isCartVisible: boolean = false;

    constructor(private dataService: DataService,
                private cartService: CartService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.foods = [];
        this.dataService.getItems().subscribe((data) => {
            this.foods = data;
            this.filteredFoods = data;
        });

        this.cart = this.cartService.getCart();
    }

    toggleCart() {
        this.isCartVisible = !this.isCartVisible;
    }

    logout() {
        this.router.navigateByUrl('/login');
    }

    addToCart(food: EFood) {
        this.cartService.addToCart(food);
        this.cart = this.cartService.getCart();
    }
    
    removeFromCart(foodId: string) {
        this.cartService.removeFromCart(foodId);
        this.cart = this.cartService.getCart();
    }

    getTotalAmount(): number {
        return this.cart.reduce((total, item) => total + item.food.price * item.quantity, 0);
    }
    
    goToPayment() {
        this.router.navigateByUrl('/payment');
    }

    filterFoods() {
        this.filteredFoods = this.foods.filter(food => {
          return (
            (!this.searchText || food.name.toLowerCase().includes(this.searchText.toLowerCase()))
          );
        });
    }

    getTruncatedName(name: string): string {
        return name.length > 40 ? name.substring(0, 40) + '...' : name;
    }
}
