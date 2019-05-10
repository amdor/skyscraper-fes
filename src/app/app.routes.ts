import {Routes} from '@angular/router';
import {IndividualCarsFormComponent} from './views/individual-cars-form/individual-cars-form.component';
import {GoogleAuthResolver} from './resolvers';
import {SavedCarsComponent} from './views/saved-cars/saved-cars.component';
import {MainComponent} from './views/main/main.component';
import {FaqComponent} from './views/faq/faq.component';

export const ROUTES: Routes = [
	{
		path: '',
		component: MainComponent,
		resolve: {auth2: GoogleAuthResolver},
		children: [
			{path: '', component: IndividualCarsFormComponent},
			{path: 'saved', component: SavedCarsComponent},
			{path: 'faq', component: FaqComponent}
		]
	}
];
