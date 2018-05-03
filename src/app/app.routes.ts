import { Routes } from '@angular/router';
import { IndividualCarsFormComponent } from './views/ssc-individual-cars-form/individual-cars-form.component';
import { GoogleAuthResolver } from './resolvers';
import {SavedCarsComponent} from './views/ssc-saved-cars/saved-cars.component';
import {MainComponent} from './views/ssc-main/main.component';
import {FaqComponent} from './views/ssc-faq/faq.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        resolve: {auth2: GoogleAuthResolver},
        children: [
			{ path: '',    component: IndividualCarsFormComponent},
			{ path: 'saved',    component: SavedCarsComponent},
			{ path: 'faq',      component: FaqComponent}
        ]
    }
];
