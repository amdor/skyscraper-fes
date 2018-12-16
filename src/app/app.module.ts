import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';

import {ROUTES} from './app.routes';
import {AppComponent} from './app.component';
import {CarDataTableComponent} from './components/ssc-car-data-table/car-data-table.component';
import {IndividualCarsFormComponent} from './views/ssc-individual-cars-form/individual-cars-form.component';
import {authReducer, carDataTableReducer, individualCarsFormReducer, languageReducer} from './reducers';
import {CarDataEffects} from './effects/car-data.effects';
import {SpinnerService} from './services/spinner.service';
import {SscNavbarComponent} from './components/ssc-navbar/ssc-navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GoogleAuthResolver} from './resolvers';
import {LocalStorageService} from './services/local-storage.service';
import {SavedCarsComponent} from './views/ssc-saved-cars/saved-cars.component';
import {SscNotificationComponent} from './components/ssc-notification/ssc-notification.component';
import {SscNotificationService} from './services/ssc-notification.service';
import {FaqComponent} from './views/ssc-faq/faq.component';
import {MainComponent} from './views/ssc-main/main.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthEffects} from './effects/auth.effects';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {SscDataService} from './services/ssc-data.service';
import {NotificationEffect} from './effects/notification.effect';


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
		SscNavbarComponent,
		SscNotificationComponent
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
		SscNotificationService,
		SpinnerService,
		SscDataService,
		GoogleAuthResolver,
		{
			provide: APP_INITIALIZER,
			useFactory: (lss: LocalStorageService) => () => {
				return lss;
			},
			deps: [LocalStorageService],
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
