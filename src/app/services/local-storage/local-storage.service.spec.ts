import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CARS_KEY, LocalStorageService} from './local-storage.service';
import {Store} from '@ngrx/store';
import {SetAllAction} from '../../actions';


describe('LocalStorageService', () => {
	let service, storeMock;

	beforeEach(() => {
		storeMock = {
			dispatch: jasmine.createSpy('dispatch')
		};
		TestBed.configureTestingModule({
			providers: [
				LocalStorageService,
				{provide: Store, useValue: storeMock}
			]
		});
		service = TestBed.get(LocalStorageService);
	});

	it('should dispatch the prefetched htmls with their urls if storage event occurs', fakeAsync(() => {
		const htmlString = '<html></html>';
		const url = 'https://mock.com';
		const newVal = {[url]: htmlString};
		const setAction = new SetAllAction([url], newVal);
		const triggerEvent = new StorageEvent('storage', {newValue: JSON.stringify(newVal), key: CARS_KEY});
		window.dispatchEvent(triggerEvent);
		tick();
		expect(storeMock.dispatch).toHaveBeenCalledWith(setAction);
	}));
});
