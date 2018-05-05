import {Action} from '@ngrx/store';

export const SET_LANGUAGE = '[LANG] Set language';

/**
 *  Language actions
 */
export class SetLanguageAction implements Action {
	readonly type = SET_LANGUAGE;

	constructor(public newLang: string) {
	}

}
