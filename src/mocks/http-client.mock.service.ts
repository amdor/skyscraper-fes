import {Injectable} from '@angular/core';
import {RawCarData} from '../app/types/car-dto';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

export const comparedData = [
	{
		'CarUri': 'https://www.hasznaltauto.hu/szemelyauto/mercedes-benz/c_250/mercedes-benz_c_250_t_bluetec_d_4matic_automata-13808437',
		'power': '150 kW',
		'speedometer': '85 000 km',
		'prod_date': '2015/3',
		'price': '8 290 000 Ft',
		'worth': 22.71
	},
	{
		'CarUri': 'https://www.hasznaltauto.hu/szemelyauto/audi/a8/audi_a8_3_0_v6_tdi_quattro_tiptronic_ic_afas-13688109',
		'power': '193 kW',
		'speedometer': '61 609 km',
		'prod_date': '2016/9',
		'price': '13 900 000 Ft',
		'worth': 27.79
	}
];

@Injectable()
export class HttpClientMock extends HttpClient {
	static doneSubject$ = new Subject<void>();

	static getDone(): Observable<void> {
		return this.doneSubject$.asObservable();
	}

	post(url: string, data: RawCarData | any, options: any): any {
		return of(comparedData).pipe(tap(() => {
			HttpClientMock.doneSubject$.next();
		}));
	}
}
