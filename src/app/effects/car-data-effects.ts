import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { CarDataActions, GetAction, GET, GET_SUCCESS, GET_FAILED } from './../actions'

@Injectable()
export class CarDataEffects {
  // Listen for the 'LOGIN' action
  @Effect() getCarData$: Observable<GetAction> = this.actions$.ofType(GET)
    .mergeMap((action: GetAction) => {
        return this.http.post('http://localhost:5000/', {carUrls: action.urlValues})
                .map(data => {
                  return { type: GET_SUCCESS, carData: data };
                })
                .catch(() => of({ type: GET_FAILED }))
    });

  constructor(private http: HttpClient, private actions$: Actions) {}
}
