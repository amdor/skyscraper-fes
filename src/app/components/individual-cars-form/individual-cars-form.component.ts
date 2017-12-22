/**
 * Form for cars put in individually
 */
import {
  Component,
  ViewEncapsulation
  } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { AppState, UrlFieldState } from './../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddAction, SetAction, RemoveAction, GetAction } from './../../actions';
import { SpinnerService } from './../../services/spinner-service';

import * as template from './individual-cars-form.component.html';
import * as style from './individual-cars-form.component.scss';


@Component({
  selector: 'individual-cars-form',
  template: `${template}`,
  styles: [`${style}`]
  })
export class IndividualCarsFormComponent implements OnDestroy {
  private savedUris: UrlFieldState[];
  private subscription: Subscription = new Subscription();
  private spinner = false;

  constructor(private store: Store<AppState>, private spinnerService: SpinnerService) {
    this.subscription.add(
      store.select(state => state.individualCars.urls).subscribe((urls) => {
        this.savedUris = urls;
      })
    );
    this.subscription.add(
      spinnerService.subscribe(waiting => {
        this.spinner = waiting
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewRow(index: number) {
    if(index === this.savedUris.findIndex(elem => elem.show === false) - 1) {
      this.store.dispatch(new AddAction());
    }
  }

  addNewUrl(event: any, index: number) {
    this.store.dispatch(new SetAction({value: event.target.value, show: true}, index));
  }

  deleteRow(index: number) {
    this.store.dispatch(new RemoveAction(index));
  }

  getCarData() {
    this.spinner = true;
    this.store.dispatch(new GetAction(this.savedUris.map(elem => elem.value)));
  }

  trackByIndex(elem, index){
    return index;
  }

}
