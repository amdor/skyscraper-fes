import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { SpinnerService } from './../services/spinner.service';

import { GetCarDataAction, GetSuccessAction, GetFailedAction, GET_CAR_DATA } from './../actions';

@Injectable()
export class CarDataEffects {
  @Effect() getCarData$: Observable<GetSuccessAction | GetFailedAction> = this.actions$.ofType(GET_CAR_DATA)
    .mergeMap((action: GetCarDataAction) => {
        return this.http.post('http://0.0.0.0:5000', action.rawData)
                .map((data: Array<any>) => {
                  this.spinnerService.setSpinner(false);
                  return new GetSuccessAction(data);
                })
                .catch((err) => {
                  this.spinnerService.setSpinner(false);
                  return of(new GetFailedAction());
                });
    });

  constructor(private http: HttpClient, private actions$: Actions, private spinnerService: SpinnerService) {}
}
