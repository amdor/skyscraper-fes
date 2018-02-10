import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { SpinnerService } from './../services/spinner.service';

import { CarDataActions, GetAction, GetSuccessAction, GetFailedAction, GET, GET_SUCCESS, GET_FAILED } from './../actions'

@Injectable()
export class CarDataEffects {
  @Effect() getCarData$: Observable<GetSuccessAction | GetFailedAction> = this.actions$.ofType(GET)
    .mergeMap((action: GetAction) => {
        return this.http.post('https://localhost:5000/', {carUrls: action.urlValues})
                .map((data: Array<any>) => {
                  this.spinnerService.setSpinner(false);
                  return new GetSuccessAction(data);
                })
                .catch((err) => {
                  this.spinnerService.setSpinner(false);
                  return of(new GetFailedAction());
                })
    });

  constructor(private http: HttpClient, private actions$: Actions, private spinnerService: SpinnerService) {}
}
