import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState} from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private translate: TranslateService, private store: Store<AppState>) {
		// this language will be used as a fallback when a translation isn't found in the current language
		translate.setDefaultLang('hu');

		// the lang to use, if the lang isn't available, it will use the current loader to get them
		this.store.select((state: AppState) => state.language).subscribe((newLang:string) => {
			translate.use(newLang);
		});
	}
}
