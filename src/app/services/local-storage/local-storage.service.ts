import {Injectable} from '@angular/core';
import {AppState} from '../../reducers';
import {Store} from '@ngrx/store';
import {SetAllAction} from '../../actions';

export const CARS_KEY = 'htmls';
const REGARDED_KEYS = [CARS_KEY];

@Injectable()
export class LocalStorageService {

	constructor(private store: Store<AppState>) {
		window.addEventListener('storage', this.eventHandler);
	}

	static getForKey(key: string) {
		if (!REGARDED_KEYS.includes(key)) {
			return {};
		}
		return JSON.parse(localStorage.getItem(key));
	}

	static setForKey(key: string, value: any) {
		if (!REGARDED_KEYS.includes(key)) {
			return;
		}
		const stringVal = JSON.stringify(value);
		localStorage.setItem(key, stringVal);
	}

	private eventHandler = (event: StorageEvent) => {
		if (REGARDED_KEYS.includes(event.key)) {
			const newValue = JSON.parse(event.newValue);
			switch (event.key) {
				case CARS_KEY:
					const storageUrls = newValue ? Object.keys(newValue) : [];
					this.store.dispatch(new SetAllAction(storageUrls, newValue));
					break;
			}
		}
	}
}
