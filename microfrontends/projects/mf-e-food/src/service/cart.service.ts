import { Injectable } from '@angular/core';
import { EFood } from '../model/e-food.model';
import { CartItem } from '../model/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private cart: CartItem[] = [];

    constructor() {
        this.loadCartFromLocalStorage();
    }

    addToCart(food: EFood) {
        const existingItem = this.cart.find(item => item.food.id === food.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ food, quantity: 1 });
        }
        this.saveCartToLocalStorage();
    }

    getCart() {
        return this.cart;
    }

    removeFromCart(foodId: string) {
        const itemIndex = this.cart.findIndex(item => item.food.id === foodId);
        if (itemIndex !== -1) {
            this.cart[itemIndex].quantity--;
            if (this.cart[itemIndex].quantity === 0) {
                this.cart.splice(itemIndex, 1);
            }
            this.saveCartToLocalStorage();
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCartToLocalStorage();
    }

    private saveCartToLocalStorage(): void {
        localStorage.setItem('foodCart', JSON.stringify(this.cart));
    }

    private loadCartFromLocalStorage(): void {
        const savedCart = localStorage.getItem('foodCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    }
}
