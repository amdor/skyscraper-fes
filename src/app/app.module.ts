import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { IndividualCarsFormComponent, CarDataTableComponent } from './components';
import { individualCarsFormReducer, carDataTableReducer } from './reducers';
import { CarDataEffects } from './effects/car-data-effects';
import { SpinnerService } from './services/spinner-service';

import '../styles/styles.scss';
/**
 * `AppModule` is the main entry point into Angular2's bootstrapping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    IndividualCarsFormComponent,
    CarDataTableComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({ individualCars: individualCarsFormReducer, carData: carDataTableReducer }),
    EffectsModule.forRoot([CarDataEffects])
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    SpinnerService
  ]
})
export class AppModule {
}
