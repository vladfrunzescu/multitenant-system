import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    email: string = "";
    password: string = "";

    constructor(private router: Router) {
    }

    onSubmit() {
        console.log('Submitted: ' + this.email + ' ' + this.password);

        if (this.email === 'food' && this.password === 'food') {
            this.router.navigateByUrl('/e-food');
        } else if (this.email === 'market' && this.password === 'market') {
            this.router.navigateByUrl('/e-market');
        }
    }
}
