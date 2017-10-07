/**
 * Form for cars put in individually
 */
import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import { AppState, UrlFieldState } from './../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddAction, SetAction, RemoveAction } from './../../actions/individual-cars-form.actions';
import { HttpClient } from '@angular/common/http';

import * as template from './individual-cars-form.component.html';
import * as style from './individual-cars-form.component.scss';


@Component({
    selector: 'individual-cars-form',
    encapsulation: ViewEncapsulation.None,
    template: `${template}`,
    styles: [`${style}`]
})
export class IndividualCarsFormComponent {
    savedUris: UrlFieldState[];
    subscription: Subscription;

	constructor(private store: Store<AppState>, private http: HttpClient) {
		this.subscription = store.select(state => state.individualCars.urls).subscribe((urls) => {
            this.savedUris = urls;
        });
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

    fetchCarValue() {
        this.http.post('http://localhost:5000/', {carUrls: this.savedUris.map(uri => uri.value)})
        .subscribe(response => {
             console.log(response);
        });
    }

    trackByIndex(elem, index){
        return index;
    }
}
