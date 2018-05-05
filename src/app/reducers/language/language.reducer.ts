import {SET_LANGUAGE, SetLanguageAction} from '../../actions/language.actions';


export function languageReducer(state = 'hu', action: SetLanguageAction): string {
	switch(action.type) {
		case SET_LANGUAGE: {
			return action.newLang;
		}
		default:
			return state;
	}
}