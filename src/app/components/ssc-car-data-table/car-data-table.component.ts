import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {AppState, selectIsSignedIn} from './../../reducers';
import {CarData} from '../../types/car-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SscNotificationService} from '../../services/ssc-notification.service';
import {NotificationType} from '../ssc-notification/ssc-notification.component';
import {first, map, take, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {DocumentChangeAction} from '@angular/fire/firestore/interfaces';


@Component({
	selector: 'ssc-car-data-table',
	templateUrl: './car-data-table.component.html',
	styleUrls: ['./car-data-table.component.scss']
})
export class CarDataTableComponent implements OnDestroy, OnInit {
	@Input()
	carData: CarData[] = [];
	private savedCarData: CarData[];
	private carDataCollection: AngularFirestoreCollection<CarData>;

	subscription = new Subscription();
	editMode = false;
	isSignedIn = false;

	constructor(private store: Store<AppState>, private http: HttpClient, private notificationService: SscNotificationService,
				private authService: AngularFireAuth, private afs: AngularFirestore) {
		this.carDataCollection = this.afs.collection('car_details');
		this.carDataCollection.snapshotChanges().pipe(
				map((actions: DocumentChangeAction<CarData>[]) => {
					return actions.map((action: DocumentChangeAction<CarData>) => {
						const data = action.payload.doc.data() as CarData;
						const id = action.payload.doc.id;
						return {id, ...data};
					});
				}))
			.subscribe((cars: CarData[]) => {
				this.savedCarData = cars;
			});
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
		this.savedCarData.forEach((data: CarData) => this.deleteCar(data.id));
		this.carData.forEach((data: CarData) => this.carDataCollection.add(data));
	}

	deleteCar(id) {
		const taskDoc = this.afs.doc<CarData>(`car_details/${id}`);
		taskDoc.delete();
	}
}
