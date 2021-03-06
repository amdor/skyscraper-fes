import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';

import {ROUTES} from './app.routes';
import {AppComponent} from './app.component';
import {CarDataTableComponent} from './components/car-data-table/car-data-table.component';
import {IndividualCarsFormComponent} from './views/individual-cars-form/individual-cars-form.component';
import {authReducer, carDataTableReducer, individualCarsFormReducer, languageReducer} from './reducers';
import {CarDataEffects} from './effects/car-data.effects';
import {SpinnerService} from './services/spinner.service';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GoogleAuthResolver} from './resolvers';
import {LocalStorageService} from './services/local-storage/local-storage.service';
import {SavedCarsComponent} from './views/saved-cars/saved-cars.component';
import {NotificationComponent} from './components/notification/notification.component';
import {NotificationService} from './services/notification.service';
import {FaqComponent} from './views/faq/faq.component';
import {MainComponent} from './views/main/main.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthEffects} from './effects/auth.effects';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {DataService} from './services/data.service';
import {NotificationEffect} from './effects/notification.effect';
import {HttpClientMock} from '../mocks/http-client.mock.service';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeHu, 'hu');

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		CarDataTableComponent,
		FaqComponent,
		IndividualCarsFormComponent,
		MainComponent,
		SavedCarsComponent,
		NavbarComponent,
		NotificationComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		NgbModule,
		RouterModule.forRoot(ROUTES),
		StoreModule.forRoot({
			individualCars: individualCarsFormReducer,
			carData: carDataTableReducer,
			auth: authReducer,
			language: languageReducer
		}),
		EffectsModule.forRoot([CarDataEffects, AuthEffects, NotificationEffect]),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
		AngularFireModule.initializeApp(environment.firebase, 'skyscraper-web'),
		AngularFireAuthModule,
		AngularFirestoreModule
	],
	providers: [
		LocalStorageService,
		NotificationService,
		SpinnerService,
		DataService,
		GoogleAuthResolver,
		{
			provide: APP_INITIALIZER,
			useFactory: (lss: LocalStorageService) => () => {
				return lss;
			},
			deps: [LocalStorageService],
			multi: true
		},
		environment.test ? {provide: HttpClient, useClass: HttpClientMock} : []
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
