import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {AppState, selectIsSignedIn} from './../../reducers';
import {CarData} from '../../types/car-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SscNotificationService} from '../../services/ssc-notification.service';
import {NotificationType} from '../ssc-notification/ssc-notification.component';
import {first, take, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';


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

	constructor(private store: Store<AppState>, private http: HttpClient, private notificationService: SscNotificationService,
				private authService: AngularFireAuth) {
	}

	ngOnInit() {
		this.subscription.add(this.store.pipe(select(selectIsSignedIn)).subscribe((isSignedIn: boolean) => {
			this.isSignedIn = isSignedIn;
		}));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	saveCarDetails() {
		this.authService.idToken.pipe(first()).subscribe((idToken: string) => {
			if (idToken) {
				this.http.put(environment.savedCarsEndpoint, {idToken: idToken, carData: this.carData}).pipe(
					take(1))
					.subscribe(() => {
						this.notificationService.showNotification(NotificationType.SUCCESS);
					}, (err) => {
						this.notificationService.showNotification(NotificationType.FAILURE, err.toString());
					});
			} else {
				this.notificationService.showNotification(NotificationType.FAILURE);
			}
		});
	}
}
