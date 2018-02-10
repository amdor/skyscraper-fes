import {
    Component,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CarData, AppState } from './../../reducers'


@Component({
    selector: 'car-data-table',
    templateUrl: './car-data-table.component.html',
    styles: []
})
export class CarDataTableComponent implements OnDestroy {
    carData: CarData[];
    subscription: Subscription;

	constructor(private store: Store<AppState>) {
		this.subscription = store.select(state => state.carData).subscribe((carDataState) => {
            this.carData = carDataState.cars.sort((car1, car2) => car2.worth - car1.worth);
    });
	}

     ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getCarName = (car: CarData) => {
        return car.CarUri.split('/').pop().split('_').slice(0, 2).join(' ');
    }
}
