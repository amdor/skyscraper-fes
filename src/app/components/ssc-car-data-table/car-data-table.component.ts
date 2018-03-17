import {
    Component,
    OnDestroy
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import {AppState} from './../../reducers';
import {CarData} from '../../types/car-dto';


@Component({
    selector: 'ssc-car-data-table',
    templateUrl: './car-data-table.component.html',
    styles: []
})
export class CarDataTableComponent implements OnDestroy {
    carData: CarData[];
    subscription: Subscription;
    carNames: Array<string> = new Array(10).fill('');
    editMode = false;

    constructor(private store: Store<AppState>) {
        this.subscription = store.select(state => state.carData).subscribe((carDataState) => {
            this.carData = carDataState.cars.sort((car1, car2) => car2.worth - car1.worth);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
