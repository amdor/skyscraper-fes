/**
 * Form for cars put in individually
 */
import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import {FormState} from './../../reducers/individual-cars-form.reducer'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {AddAction} from './../../actions/individual-cars-form.actions'

import * as template from './individual-cars-form.component.html';
import * as style from './individual-cars-form.component.scss'


@Component({
    selector: 'individual-cars-form',
    encapsulation: ViewEncapsulation.None,
    template: `${template}`,
    styles: [`${style}`]
})
export class IndividualCarsFormComponent {
    savedUris: Observable<string[]>;

	constructor(private store: Store<FormState>) {
		this.savedUris = store.select('urls');
	}

    addNewRow() {
        
    }

    addNewUrl(event: any) {
        this.store.dispatch(new AddAction(event.target.value));
    }

}
