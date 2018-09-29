///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
/**
 * Form for cars put in individually
 */
import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AppState, selectAuthState, selectIsSignedIn} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';


import {CarData} from '../../types/car-dto';
import {GetSavedCarDataAction} from '../../actions';
import {AuthState} from '../../reducers/auth/auth.reducer';

import {ActivatedRoute, Router} from '@angular/router';
import {ResetSavedCarDataAction} from '../../actions/car-data.actions';
import {distinctUntilChanged} from 'rxjs/operators';


@Component({
	selector: 'ssc-saved-cars',
	templateUrl: './saved-cars.component.html',
	styleUrls: []
})
export class SavedCarsComponent implements OnDestroy, OnInit {
	spinner = true;
	carData: CarData[] = [];
	private subscription: Subscription = new Subscription();

	constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef,
				private router: Router, private route: ActivatedRoute, private zone: NgZone) {
	}

	ngOnInit() {
		this.subscription.add(this.store.pipe(select(state => state.carData)).subscribe((carDataState) => {
			this.carData = carDataState.cars.sort((car1, car2) => car2.worth - car1.worth);
			this.spinner = !this.carData.length;
			this.cdRef.detectChanges();
		}));
		this.subscription.add(this.store.pipe(select(selectAuthState)).subscribe((authState: AuthState) => {
			if (authState.idToken) {
				this.store.dispatch(new GetSavedCarDataAction(authState.idToken));
			}
		}));
		this.subscription.add(this.store.pipe(select(selectIsSignedIn), distinctUntilChanged()).subscribe((isSignedIn: boolean) => {
			if (!isSignedIn) {
				this.store.dispatch(new ResetSavedCarDataAction());
				this.zone.run(() => this.router.navigate(['../'], {relativeTo: this.route}));
			}
		}));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
