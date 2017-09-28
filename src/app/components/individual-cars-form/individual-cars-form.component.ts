/**
 * Form for cars put in individually
 */
import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

import * as template from './individual-cars-form.component.html';
import * as style from './individual-cars-form.component.scss'


@Component({
    selector: 'individual-cars-form',
    encapsulation: ViewEncapsulation.None,
    template: `${template}`,
    styles: [`${style}`]
})
export class IndividualCarsFormComponent {

}
