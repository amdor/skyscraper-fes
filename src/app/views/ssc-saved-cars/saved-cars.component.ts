///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
/**
 * Form for cars put in individually
 */
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppState, selectAuthState} from '../../reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/defer';
import {HttpClient} from '@angular/common/http';
import {CarData} from '../../types/car-dto';
import {GetSavedCarDataAction} from '../../actions';
import {AuthState} from '../../reducers/auth/auth.reducer';


@Component({
	selector: 'ssc-saved-cars',
	templateUrl: './saved-cars.component.html',
	styleUrls: []
})
export class SavedCarsComponent implements OnDestroy, OnInit {
	spinner = true;
	carData: CarData[] = [];
	private subscription: Subscription = new Subscription();

	constructor(private store: Store<AppState>, private http: HttpClient,
				private cdRef: ChangeDetectorRef) {	}

	ngOnInit() {
		this.subscription.add(this.store.select(state => state.carData).subscribe((carDataState) => {
			this.carData = carDataState.cars.sort((car1, car2) => car2.worth - car1.worth);
			this.spinner = !this.carData.length;
			this.cdRef.detectChanges();
		}));
		this.subscription.add(this.store.select(selectAuthState).subscribe((authState: AuthState) => {
			if(authState.idToken) {
				this.store.dispatch(new GetSavedCarDataAction(authState.idToken));
			}
		}));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
