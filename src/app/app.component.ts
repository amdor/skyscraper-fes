/**
 * Angular 2 decorators and services
 */
import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

import * as template from './app.html';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  // https://medium.com/@frosty/angularjs-template-vs-templateurl-cdde055b7907
  template: `${template}`
})
export class AppComponent {
  public name = 'Skyscraper';
}
