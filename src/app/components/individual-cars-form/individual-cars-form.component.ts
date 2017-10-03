/**
 * Form for cars put in individually
 */
import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import { AppState } from './../../reducers'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'
import { AddAction, SetAction } from './../../actions/individual-cars-form.actions'

import * as template from './individual-cars-form.component.html';
import * as style from './individual-cars-form.component.scss'


@Component({
    selector: 'individual-cars-form',
    encapsulation: ViewEncapsulation.None,
    template: `${template}`,
    styles: [`${style}`]
})
export class IndividualCarsFormComponent {
    savedUris: string[];
    subscription: Subscription;

	constructor(private store: Store<AppState>) {
		this.subscription = store.select(state => state.individualCars.urls).subscribe((urls) => {
            this.savedUris = urls;
        });
	}

    addNewRow() {
        this.store.dispatch(new AddAction(''));
    }

    addNewUrl(event: any, index: number) {
        this.store.dispatch(new SetAction(event.target.value, index));
    }

}
