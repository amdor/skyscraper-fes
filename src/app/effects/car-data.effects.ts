import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SpinnerService} from './../services/spinner.service';
import {GET_CAR_DATA, GetCarDataAction, GetCarDataFailedAction, GetSavedCarDataAction, GetCarDataSuccessAction} from './../actions';
import {environment} from './../../environments/environment';
import {GET_SAVED_CAR_DATA} from '../actions/car-data.actions';
import {catchError, map, mergeMap, take, timeout} from 'rxjs/operators';
import {CarData} from '../types/car-dto';
import {AngularFirestore, CollectionReference} from '@angular/fire/firestore';
import {User} from 'firebase';


@Injectable()
export class CarDataEffects {
	@Effect() getCarData$: Observable<GetCarDataSuccessAction | GetCarDataFailedAction> = this.actions$.pipe(
		ofType(GET_CAR_DATA),
		mergeMap((action: GetCarDataAction) => {
			return this.http.post(environment.bes, action.rawData).pipe(
				map((carData: CarData[]) => {
					this.spinnerService.setSpinner(false);
					return new GetCarDataSuccessAction(carData);
				}),
				catchError(() => {
					this.spinnerService.setSpinner(false);
					return of(new GetCarDataFailedAction());
				}));
		}));

	@Effect() getSavedCarData$: Observable<GetCarDataSuccessAction | GetCarDataFailedAction> = this.actions$.pipe(
		ofType(GET_SAVED_CAR_DATA),
		mergeMap((action: GetSavedCarDataAction) => {
			// get the car group number by user
			return this.afs.collection(environment.userCollection).doc(action.user.uid).valueChanges().pipe(
				take(1),
				// inner observable's emits needed
				mergeMap((user: { carGroup }) => {
					// car detail documents by car group
					const carDetailsCollection = this.afs.collection(environment.carDataCollection, (ref: CollectionReference) => {
						return ref.where('carGroup', '==', user.carGroup);
					});
					return carDetailsCollection.valueChanges().pipe(
						take(1),
						map((savedCarData: CarData[]) => {
							this.spinnerService.setSpinner(false);
							return new GetCarDataSuccessAction(savedCarData);
						}),
						timeout(200)
					);
				}),
				catchError((err) => {
					this.spinnerService.setSpinner(false);
					return of(new GetCarDataFailedAction());
				})
			);
		}));

	constructor(private http: HttpClient, private actions$: Actions, private spinnerService: SpinnerService, private afs: AngularFirestore) {
	}
}
