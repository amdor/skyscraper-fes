/**
 * Form for cars put in individually
 */
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppState, selectIndividualCarHtmls, selectIndividualCarUrls} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {combineLatest, defer, Observable, Subscription} from 'rxjs';
import {GetCarDataAction, SetAction} from '../../actions';
import {SpinnerService} from '../../services/spinner.service';


import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CarData, RawCarData} from '../../types/car-dto';
import {take} from 'rxjs/operators';


@Component({
	selector: 'ssc-individual-cars-form',
	templateUrl: './individual-cars-form.component.html',
	styleUrls: ['./individual-cars-form.component.scss']
})
export class IndividualCarsFormComponent implements OnDestroy, OnInit {
	uris: string[];
	spinner = false;
	carData: CarData[];
	private subscription: Subscription = new Subscription();
	private readonly proxy = 'https://skyscraper-proxy.herokuapp.com';
	private prefetchedHtmls: any;

	constructor(private store: Store<AppState>, private spinnerService: SpinnerService, private http: HttpClient,
				private cdRef: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.subscription.add(
			combineLatest<string[], any>(this.store.pipe(select(selectIndividualCarUrls)), this.store.pipe(select(selectIndividualCarHtmls)))
				.subscribe(([urls, prefetchedHtmls]) => {
					this.uris = urls;
					this.prefetchedHtmls = prefetchedHtmls;
				})
		);

		this.subscription.add(
			this.spinnerService.subscribe(waiting => {
				this.spinner = waiting;
			})
		);

		this.subscription.add(this.store.pipe(select(state => state.carData)).subscribe((carDataState) => {
			this.carData = carDataState.cars.sort((car1, car2) => car2.worth - car1.worth);
			this.cdRef.detectChanges();
		}));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	addNewUrl(uri: string, index: number) {
		this.store.dispatch(new SetAction(uri, index));
	}

	removeUrl(url: string, index: number) {
		url = '';
		this.addNewUrl(url, index);
	}

	getCarData() {
		this.spinnerService.setSpinner(true);
		const nonEmptyUris = this.uris.filter(uri => uri !== '');
		defer(async () => {
			const rawCarData: RawCarData = {carUrls: [], htmls: {}};
			for (const uri of nonEmptyUris) {
				rawCarData.carUrls.push(uri);
				if (this.prefetchedHtmls[uri]) {
					rawCarData.htmls[uri] = this.prefetchedHtmls[uri];
				} else {
					const html = await this.getCarHtml(uri);
					if (html) {
						rawCarData.htmls[uri] = html;
					}
				}
			}
			return rawCarData;
		}).pipe(take(1)).subscribe((rawCarData: RawCarData) => {
			this.store.dispatch(new GetCarDataAction(rawCarData));
		});
	}

	trackByIndex(index: number, obj: any): any {
		return index;
	}

	private async getCarHtml(uri: string) {
		return this.http.get(uri, {responseType: 'text'}).toPromise()
			.catch((err: HttpErrorResponse) => {
				const requestUrl = (err.error.currentTarget && err.error.currentTarget.__zone_symbol__xhrURL) || err.url || '';
				if (!requestUrl.includes(this.proxy)) {
					return this.getCarHtml(this.proxy + '/' + requestUrl);
				}
				console.error('An error occurred:', err.error);
			});
	}

}
