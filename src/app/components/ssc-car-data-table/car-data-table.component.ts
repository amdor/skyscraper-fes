import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {AppState, selectAuthState} from './../../reducers';
import {CarData} from '../../types/car-dto';
import {AuthState} from '../../reducers/auth/auth.reducer';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SscNotificationService} from '../../services/ssc-notification.service';
import {NotificationType} from '../ssc-notification/ssc-notification.component';


@Component({
	selector: 'ssc-car-data-table',
	templateUrl: './car-data-table.component.html',
	styleUrls: ['./car-data-table.component.scss']
})
export class CarDataTableComponent implements OnDestroy, OnInit {
	@Input()
	carData: CarData[] = [];

	subscription = new Subscription();
	editMode = false;
	isSignedIn = false;
	private idToken = '';

	constructor(private store: Store<AppState>, private http: HttpClient, private notificationService: SscNotificationService) {
	}

	ngOnInit() {
		this.subscription.add(this.store.select(selectAuthState).subscribe((authState: AuthState) => {
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
			.subscribe(()=>{this.notificationService.showNotification(NotificationType.SUCCESS)}, (err) =>{console.error(err.toString());})
	}
}
