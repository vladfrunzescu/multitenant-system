import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EMarket} from "../../model/e-market.model";
import { DataService } from '../../service/data.service';
import { CartItem } from '../../model/cart-item.model';
import { CartService } from '../../service/cart.service';

@Component({
    selector: 'app-e-market',
    templateUrl: './e-market.component.html',
    styleUrls: ['./e-market.component.scss'],
})
export class EMarketComponent implements OnInit {

    products: EMarket[] = [];
    filteredProducts: EMarket[] = [];

    types: string[] = [];
    sellers: string[] = [];
    searchText: string = '';
    selectedType: string = '';
    selectedSeller: string = '';

    cart: CartItem[] = [];

    isCartVisible: boolean = false;

    constructor(private dataService: DataService,
                private cartService: CartService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.products = [];
        this.dataService.getItems().subscribe((data) => {
            this.products = data;
            this.filteredProducts = data;
            this.extractTypesAndSellers();
        });

        this.cart = this.cartService.getCart();
    }

    extractTypesAndSellers(): void {
        const typesSet = new Set<string>();
        const sellersSet = new Set<string>();
    
        this.products.forEach(product => {
          typesSet.add(product.tenantSpecificAttributes.type);
          sellersSet.add(product.tenantSpecificAttributes.seller);
        });
    
        this.types = Array.from(typesSet);
        this.sellers = Array.from(sellersSet);
    }

    toggleCart() {
        this.isCartVisible = !this.isCartVisible;
    }

    logout() {
        this.router.navigateByUrl('/login');
    }

    addToCart(product: EMarket) {
        this.cartService.addToCart(product);
        this.cart = this.cartService.getCart();
    }
    
    removeFromCart(productId: string) {
        this.cartService.removeFromCart(productId);
        this.cart = this.cartService.getCart();
    }

    getTotalAmount(): number {
        return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
    
    goToPayment() {
        this.router.navigateByUrl('/payment');
    }

    filterProducts() {
        this.filteredProducts = this.products.filter(product => {
          return (
            (!this.searchText || product.name.toLowerCase().includes(this.searchText.toLowerCase())) &&
            (!this.selectedType || product.tenantSpecificAttributes.type === this.selectedType) &&
            (!this.selectedSeller || product.tenantSpecificAttributes.seller === this.selectedSeller)
          );
        });
    }

    getTruncatedName(name: string): string {
        return name.length > 40 ? name.substring(0, 40) + '...' : name;
    }
}
