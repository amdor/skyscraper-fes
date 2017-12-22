import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { SpinnerService } from './../services/spinner-service';

import { CarDataActions, GetAction, GET, GET_SUCCESS, GET_FAILED } from './../actions'

@Injectable()
export class CarDataEffects {
  @Effect() getCarData$: Observable<GetAction> = this.actions$.ofType(GET)
    .mergeMap((action: GetAction) => {
        return this.http.post('https://localhost:5000/', {carUrls: action.urlValues})
                .map(data => {
                  this.spinnerService.setSpinner(false);
                  return { type: GET_SUCCESS, carData: data };
                })
                .catch((err) => {
                  this.spinnerService.setSpinner(false);
                  return of({ type: GET_FAILED })
                })
    });

  constructor(private http: HttpClient, private actions$: Actions, private spinnerService: SpinnerService) {}
}
