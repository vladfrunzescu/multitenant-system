import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';
import {LoginComponent} from './login/login.component';
import {MicrofrontendService} from './microfrontends/microfrontend.service';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

export function initializeApp(mfService: MicrofrontendService): () => Promise<void> {
    return () => mfService.initialise();
}

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule,
        RouterModule.forRoot(APP_ROUTES, {relativeLinkResolution: 'legacy'})],
    providers: [
        MicrofrontendService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            multi: true,
            deps: [MicrofrontendService],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
