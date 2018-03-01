import { Routes } from '@angular/router';
import { IndividualCarsFormComponent } from './views/ssc-individual-cars-form/individual-cars-form.component';
import { GoogleAuthResolver } from './resolvers';

export const ROUTES: Routes = [
    { path: '',      component: IndividualCarsFormComponent,    resolve: {auth2: GoogleAuthResolver}}
];
