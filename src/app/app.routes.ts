import { Routes } from '@angular/router';
import { IndividualCarsFormComponent } from './views/ssc-individual-cars-form/individual-cars-form.component';
import { GoogleAuthResolver } from './resolvers';
import {SavedCarsComponent} from './views/ssc-saved-cars/saved-cars.component';

export const ROUTES: Routes = [
    { path: '',         component: IndividualCarsFormComponent,    resolve: {auth2: GoogleAuthResolver}},
    { path: 'saved',    component: SavedCarsComponent,    resolve: {auth2: GoogleAuthResolver}}
];
