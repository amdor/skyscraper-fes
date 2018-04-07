import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import {AppState, selectAuthState} from './../../reducers';
import {CarData} from '../../types/car-dto';
import {AuthState} from '../../reducers/auth/auth.reducer';
import {GetSavedCarDataAction} from '../../actions';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Component({
	selector: 'ssc-car-data-table',
	templateUrl: './car-data-table.component.html',
	styleUrls: ['./car-data-table.component.scss']
})
export class CarDataTableComponent implements OnDestroy, OnInit {
	carData: CarData[] = [];
	subscription = new Subscription();
	editMode = false;
	isSignedIn = false;
	private idToken = '';

	constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, private http: HttpClient) {
	}

	ngOnInit() {
		this.subscription.add(this.store.select(state => state.carData).subscribe((carDataState) => {
			this.carData = carDataState.cars.sort((car1, car2) => car2.worth - car1.worth);
			this.cdRef.detectChanges();
		}));
		this.subscription.add(this.store.select(selectAuthState).subscribe((authState: AuthState) => {
			if(authState.isSignedIn) {
				this.store.dispatch(new GetSavedCarDataAction(authState.idToken));
			}
			this.idToken = authState.idToken || '';
			this.isSignedIn = authState.isSignedIn;
		}))
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	saveCarDetails() {
		this.http.put(environment.savedCarsEndpoint, {idToken: this.idToken, carData: this.carData})
			.take(1)
			.subscribe(()=>{console.log('Success');}, (err) =>{console.error(err.toString());})
	}
}
