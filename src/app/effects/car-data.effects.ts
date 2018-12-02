import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SpinnerService} from './../services/spinner.service';
import {
	CarDataFailAction,
	CarDataSuccessAction,
	GET_CAR_DATA,
	GetCarDataAction,
	GetCarDataFailedAction,
	GetCarDataSuccessAction,
	GetSavedCarDataAction, SaveCarDataAction
} from './../actions';
import {environment} from './../../environments/environment';
import {GET_SAVED_CAR_DATA} from '../actions/car-data.actions';
import {catchError, map, mergeMap, take, timeout} from 'rxjs/operators';
import {CarData} from '../types/car-dto';
import {SscDataService} from '../services/ssc-data.service';
import {SscUser} from '../types/ssc-user-dto';
import {select} from '@ngrx/store';
import {selectUser} from '../reducers';


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
			return this.dataService.getUserCarGroup(action.user).pipe(
				take(1),
				// inner observable's emits needed
				mergeMap((sscUser: SscUser) => {
					// car detail documents by car group
					return this.dataService.getSavedCarDataByCarGroup(sscUser.carGroup).pipe(
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

	@Effect() saveCarData: Observable<CarDataSuccessAction | CarDataFailAction> = this.actions$.pipe(
		ofType(GET_SAVED_CAR_DATA),
		mergeMap((action: SaveCarDataAction) => {
			// delete data for user
			return this.dataService.getUserCarGroup(action.user).pipe(
				take(1),
				// inner observable's emits needed
				mergeMap((sscUser: SscUser) => {
					// car detail documents by car group
					return this.dataService.getSavedCarDataByCarGroup(sscUser.carGroup).pipe(
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
					return of(new CarDataFailAction(''));
				})
			);
		}));

	constructor(private http: HttpClient,
				private actions$: Actions,
				private spinnerService: SpinnerService,
				private dataService: SscDataService) {
	}
}
