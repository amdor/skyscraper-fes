/**
 * Angular 2 decorators and services
 */
import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

import * as template from './app.html';
import * as style from './app.component.scss'

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  // https://medium.com/@frosty/angularjs-template-vs-templateurl-cdde055b7907
  template: `${template}`,
  styles: [`${style}`]
})
export class AppComponent {
  public name = 'Skyscraper';
}
