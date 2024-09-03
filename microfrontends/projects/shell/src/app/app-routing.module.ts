import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {loadRemoteModule} from './utils/utils';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {
        path: 'payment',
        loadChildren: () =>
            loadRemoteModule({
                remoteName: 'payment',
                remoteEntry: 'http://localhost:4202/remoteEntry.js',
                exposedModule: 'PaymentModule',
            }).then(m => m.PaymentModule),
    },
    {
        path: 'e-food',
        loadChildren: () =>
            loadRemoteModule({
                remoteName: 'foods',
                remoteEntry: 'http://localhost:4203/remoteEntry.js',
                exposedModule: 'EFoodModule',
            }).then(m => m.EFoodModule),
    },
    {
        path: 'e-market',
        loadChildren: () =>
            loadRemoteModule({
                remoteName: 'market',
                remoteEntry: 'http://localhost:4204/remoteEntry.js',
                exposedModule: 'EMarketModule',
            }).then(m => m.EMarketModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
