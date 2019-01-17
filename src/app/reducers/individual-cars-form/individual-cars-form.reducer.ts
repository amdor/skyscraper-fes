import {CarFormActions, SET, SET_ALL} from './../../actions';
import {CARS_KEY, LocalStorageService} from '../../services/local-storage/local-storage.service';

const EMPTY_ARR = new Array<string>(10).fill('');

export interface FormState {
	urls: string[];
	prefetchedHtmls: Map<string, string>;
}

export const initialFormState: FormState = {
	urls: getInitialUrls(),
	prefetchedHtmls: LocalStorageService.getForKey(CARS_KEY) || {}
};

export function individualCarsFormReducer(state = initialFormState, action: CarFormActions): FormState {
	let newUrls: Array<string> = [...state.urls];
	let newPrefetchedHtmls = {...state.prefetchedHtmls};
	switch (action.type) {
		case SET: {
			newUrls = [...state.urls];
			newUrls[action.index] = action.url;
			break;
		}
		case SET_ALL: {
			newUrls = [...getNewUrls(action.urls, state.urls.length), ...EMPTY_ARR].slice(0, EMPTY_ARR.length);
			newPrefetchedHtmls = action.prefetchedHtmls;
			break;
		}
		default: {
			return state;
		}
	}
	updateStorage(newUrls);
	return {
		prefetchedHtmls: newPrefetchedHtmls,
		urls: newUrls
	};
}

function getNewUrls(newUrls: string[], maxLength: number) {
	return [...newUrls.slice(0, maxLength)];
}

function getInitialUrls() {
	const cars = LocalStorageService.getForKey(CARS_KEY);
	const storageUrls = cars ? Object.keys(cars) : [];
	let retVal = [...EMPTY_ARR];
	if (storageUrls.length) {
		retVal = [...storageUrls, ...EMPTY_ARR].slice(0, EMPTY_ARR.length);
	}
	return retVal;
}

function updateStorage(urls: string[]) {
	const old = LocalStorageService.getForKey(CARS_KEY) || {};
	const newVal = {};
	for (const url of urls.filter(elem => !!elem)) {
		if (Object.keys(old).includes(url)) {
			newVal[url] = old[url];
		} else {
			newVal[url] = '';
		}
	}
	LocalStorageService.setForKey(CARS_KEY, newVal);
}
