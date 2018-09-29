import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './reducers';
import {SetLanguageAction} from './actions/language.actions';

@Component({
	selector: 'ssc-app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private translate: TranslateService, private store: Store<AppState>) {
		// this language will be used as a fallback when a translation isn't found in the current language
		if(['en', 'hu'].includes(navigator.language)) {
			translate.setDefaultLang(navigator.language);
			this.store.dispatch(new SetLanguageAction(navigator.language));
		} else if(navigator.languages.length) {
			let lang = 'hu';
			switch(true) {
				case navigator.languages.includes('hu'):
					lang = 'hu';
					break;
				case navigator.languages.some((language: string) => {
					return language.includes('en');
				}):
					lang = 'en';
					break;
				default:
					lang = 'en';
			}
			translate.setDefaultLang(lang);
			this.store.dispatch(new SetLanguageAction(lang));
		} else {
			translate.setDefaultLang('en');
			this.store.dispatch(new SetLanguageAction('en'));
		}

		// the lang to use, if the lang isn't available, it will use the current loader to get them
		this.store.pipe(select((state: AppState) => state.language)).subscribe((newLang: string) => {
			translate.use(newLang);
		});
	}
}
