import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {buildRoutes} from '../utils/route-utils';
import {MicroFE} from './microfrontend.model';

@Injectable({providedIn: 'root'})
export class MicrofrontendService {
    frontends: MicroFE[];

    constructor(private router: Router) {
    }


    initialise(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                this.frontends = this.loadConfig();
                this.router.resetConfig(buildRoutes(this.frontends));
                resolve();
            } catch (error) {
                console.error('Error initializing microfrontends: ', error);
                reject(error);
            }
        });
    }


    loadConfig(): MicroFE[] {
        return [
            {
                remoteEntry: 'http://localhost:4202/remoteEntry.js',
                remoteName: 'payment',
                exposedModule: 'PaymentModule',

                displayName: 'Payment',
                routePath: 'payment',
                ngModuleName: 'PaymentModule',
            },
            {
                remoteEntry: 'http://localhost:4203/remoteEntry.js',
                remoteName: 'foods',
                exposedModule: 'EFoodModule',

                displayName: 'EFood',
                routePath: 'e-food',
                ngModuleName: 'EFoodModule',
            },
            {
                remoteEntry: 'http://localhost:4204/remoteEntry.js',
                remoteName: 'market',
                exposedModule: 'EMarketModule',

                displayName: 'EMarket',
                routePath: 'e-market',
                ngModuleName: 'EMarketModule',
            },
        ];
    }
}
