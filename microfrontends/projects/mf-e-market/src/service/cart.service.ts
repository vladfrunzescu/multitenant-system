import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item.model';
import { EMarket } from '../model/e-market.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private cart: CartItem[] = [];

    constructor() {
        this.loadCartFromLocalStorage();
    }

    addToCart(product: EMarket) {
        const existingItem = this.cart.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ product, quantity: 1 });
        }
        this.saveCartToLocalStorage();
    }

    getCart() {
        return this.cart;
    }

    removeFromCart(productId: string) {
        const itemIndex = this.cart.findIndex(item => item.product.id === productId);
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
        localStorage.setItem('marketCart', JSON.stringify(this.cart));
    }

    private loadCartFromLocalStorage(): void {
        const savedCart = localStorage.getItem('marketCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
    }
}
