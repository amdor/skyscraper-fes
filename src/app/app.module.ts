import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { CarDataTableComponent } from './components/car-data-table/car-data-table.component';
import { IndividualCarsFormComponent } from './components/individual-cars-form/individual-cars-form.component';
import { individualCarsFormReducer, carDataTableReducer } from './reducers';
import { CarDataEffects } from './effects/car-data-effects';
import { SpinnerService } from './services/spinner.service';


@NgModule({
  declarations: [
    AppComponent,
    CarDataTableComponent,
    IndividualCarsFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({ individualCars: individualCarsFormReducer, carData: carDataTableReducer }),
    EffectsModule.forRoot([CarDataEffects])
  ],
  providers: [SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
