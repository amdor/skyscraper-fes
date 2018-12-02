/**
 * Form for cars put in individually
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState, selectIsSignedIn} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';


import {CarData} from '../../types/car-dto';

import {ActivatedRoute, Router} from '@angular/router';
import {GetSavedCarDataAction, ResetSavedCarDataAction} from '../../actions/car-data.actions';
import {distinctUntilChanged} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {SpinnerService} from '../../services/spinner.service';


@Component({
	selector: 'ssc-saved-cars',
	templateUrl: './saved-cars.component.html',
	styleUrls: []
})
export class SavedCarsComponent implements OnDestroy, OnInit {
	spinner = true;
	carData: CarData[] = [];
	private subscription: Subscription = new Subscription();

	constructor(private store: Store<AppState>,
				private router: Router,
				private route: ActivatedRoute,
				private authService: AngularFireAuth,
				private spinnerService: SpinnerService) {
	}

	ngOnInit() {
		// TODO: use resolved value?
		this.subscription.add(this.store.pipe(select(state => state.carData)).subscribe((carDataState) => {
			this.carData = carDataState.cars.sort((car1, car2) => car2.worth - car1.worth);
			// this.spinner = !this.carData.length;
		}));
		this.subscription.add(
			this.spinnerService.subscribe(waiting => {
				this.spinner = waiting;
			})
		);

		// TODO: resolver
		this.subscription.add(this.authService.user.subscribe((user: User) => {
			if (user) {
				this.store.dispatch(new GetSavedCarDataAction(user));
			}
		}));

		// TODO: canActivate instead
		this.subscription.add(this.store.pipe(select(selectIsSignedIn), distinctUntilChanged()).subscribe((isSignedIn: boolean) => {
			if (!isSignedIn) {
				this.store.dispatch(new ResetSavedCarDataAction());
				this.router.navigate(['../'], {relativeTo: this.route});
			}
		}));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
