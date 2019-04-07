import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {AppState, selectIsSignedIn} from '../../reducers';
import {CarData} from '../../types/car-dto';
import {SaveCarDataAction} from '../../actions';
import {selectUser} from '../../reducers';
import {User} from 'firebase';
import {take} from 'rxjs/operators';


@Component({
	selector: 'ssc-car-data-table',
	templateUrl: './car-data-table.component.html',
	styleUrls: ['./car-data-table.component.scss']
})
export class CarDataTableComponent implements OnDestroy, OnInit {
	@Input() carData: CarData[] = [];

	subscription = new Subscription();
	editMode = false;
	isSignedIn = false;
	lang$!: Observable<string>;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit() {
		this.subscription.add(this.store.pipe(select(selectIsSignedIn)).subscribe((isSignedIn: boolean) => {
			this.isSignedIn = isSignedIn;
		}));
		this.lang$ = this.store.pipe(select((state: AppState) => state.language));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	saveCarDetails() {
		this.store.pipe(select(selectUser), take(1)).subscribe((user: User) => {
			this.store.dispatch(new SaveCarDataAction(this.carData, user));
		});
	}
}
