import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SpinnerService} from './../services/spinner.service';
import {GET_CAR_DATA, GetCarDataAction, GetFailedAction, GetSavedCarDataAction, GetSuccessAction} from './../actions';
import {environment} from './../../environments/environment';
import {GET_SAVED_CAR_DATA} from '../actions/car-data.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';


@Injectable()
export class CarDataEffects {
	@Effect() getCarData$: Observable<GetSuccessAction | GetFailedAction> = this.actions$.pipe(
		ofType(GET_CAR_DATA),
		mergeMap((action: GetCarDataAction) => {
			return this.http.post(environment.bes, action.rawData).pipe(
				map((data: Array<any>) => {
					this.spinnerService.setSpinner(false);
					return new GetSuccessAction(data);
				}),
				catchError((err) => {
					this.spinnerService.setSpinner(false);
					return of(new GetFailedAction());
				}));
		}));

	@Effect() getSavedCarData$: Observable<GetSuccessAction | GetFailedAction> = this.actions$.pipe(
		ofType(GET_SAVED_CAR_DATA),
		mergeMap((action: GetSavedCarDataAction) => {
			return this.http.post(environment.savedCarsEndpoint, {idToken: action.idToken}).pipe(
				map((data: Array<any>) => {
					this.spinnerService.setSpinner(false);
					return new GetSuccessAction(data);
				}),
				catchError((err) => {
					this.spinnerService.setSpinner(false);
					return of(new GetFailedAction());
				}));
		}));

	constructor(private http: HttpClient, private actions$: Actions, private spinnerService: SpinnerService) {
	}
}
