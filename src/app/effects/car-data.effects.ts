import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SpinnerService} from '../services/spinner.service';
import {
	CarDataFailAction,
	CarDataSuccessAction,
	GET_CAR_DATA,
	GetCarDataAction,
	GetCarDataSuccessAction,
	GetSavedCarDataAction,
	SaveCarDataAction
} from '../actions';
import {environment} from '../../environments/environment';
import {GET_SAVED_CAR_DATA, SAVE_CAR_DATA} from '../actions';
import {catchError, map, mergeMap, take, timeout} from 'rxjs/operators';
import {CarData} from '../types/car-dto';
import {DataService} from '../services/data.service';
import {SscUser} from '../types/user-dto';

@Injectable()
export class CarDataEffects {
	@Effect() getCarData$: Observable<GetCarDataSuccessAction | CarDataFailAction> = this.actions$.pipe(
		ofType(GET_CAR_DATA),
		mergeMap((action: GetCarDataAction) => {
			return this.http.post(environment.bes, action.rawData).pipe(
				map((carData: CarData[]) => {
					this.spinnerService.setSpinner(false);
					return new GetCarDataSuccessAction(carData);
				}),
				catchError(() => {
					this.spinnerService.setSpinner(false);
					return of(new CarDataFailAction('Failed to get car data for URL'));
				}));
		}));

	@Effect() getSavedCarData$: Observable<GetCarDataSuccessAction | CarDataFailAction> = this.actions$.pipe(
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
						timeout(2000)
					);
				}),
				catchError((err) => {
					this.spinnerService.setSpinner(false);
					return of(new CarDataFailAction('Failed to get saved car data for user'));
				})
			);
		}));

	// create feature group for user if needed
	// set data
	@Effect() saveCarData: Observable<any | CarDataFailAction> = this.actions$.pipe(
		ofType(SAVE_CAR_DATA),
		mergeMap((action: SaveCarDataAction) => {
			return this.dataService.getUserCarGroup(action.user).pipe(
				take(1),
				mergeMap((sscUser: SscUser) => {
					if (!sscUser) {
						return this.dataService.createNewUserWithCarGroup(action.user);
					}
					return of(sscUser.carGroup);
				}),
				mergeMap((userCarGroup: number) => {
					return this.dataService.saveCarDataByCarGroup(userCarGroup, action.carData);
				}),
				map((val) => {
					return new CarDataSuccessAction('Car data saved');
				}),
				catchError((err) => {
					this.spinnerService.setSpinner(false);
					return of(new CarDataFailAction('Failed to save car data'));
				})
			);
		}));

	constructor(private http: HttpClient,
				private actions$: Actions,
				private spinnerService: SpinnerService,
				private dataService: DataService) {
	}
}
