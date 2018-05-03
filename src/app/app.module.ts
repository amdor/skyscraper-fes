import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';

import {ROUTES} from './app.routes';
import {AppComponent} from './app.component';
import {CarDataTableComponent} from './components/ssc-car-data-table/car-data-table.component';
import {IndividualCarsFormComponent} from './views/ssc-individual-cars-form/individual-cars-form.component';
import {authReducer, carDataTableReducer, individualCarsFormReducer} from './reducers';
import {CarDataEffects} from './effects/car-data-effects';
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
		NgbModule.forRoot(),
		RouterModule.forRoot(ROUTES),
		StoreModule.forRoot({
			individualCars: individualCarsFormReducer,
			carData: carDataTableReducer,
			googleAuth: authReducer
		}),
		EffectsModule.forRoot([CarDataEffects])
	],
	providers: [
		LocalStorageService,
		SscNotificationService,
		SpinnerService,
		GoogleAuthResolver,
		{
			provide: APP_INITIALIZER,
			useFactory: (lss: LocalStorageService) => () => {
				return lss
			},
			deps: [LocalStorageService],
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
