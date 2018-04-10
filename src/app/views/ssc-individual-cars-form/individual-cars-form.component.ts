/**
 * Form for cars put in individually
 */
import {Component, OnDestroy} from '@angular/core';
import {AppState, selectAuth2, selectIndividualCarHtmls, selectIndividualCarUrls} from '../../reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {GetCarDataAction, SetAction} from '../../actions';
import {SpinnerService} from '../../services/spinner.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/defer';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {RawCarData} from '../../types/car-dto';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';


@Component({
    selector: 'ssc-individual-cars-form',
    templateUrl: './individual-cars-form.component.html',
    styleUrls: ['./individual-cars-form.component.scss']
})
export class IndividualCarsFormComponent implements OnDestroy {
    uris: string[];
    spinner = false;
    private subscription: Subscription = new Subscription();
    private readonly proxy = 'https://skyscraper-proxy.herokuapp.com';
    private prefetchedHtmls: any;

    constructor(private store: Store<AppState>, private spinnerService: SpinnerService, private http: HttpClient) {
		this.subscription.add(
			combineLatest(store.select(selectIndividualCarUrls), store.select(selectIndividualCarHtmls))
				.subscribe(([urls, prefetchedHtmls]) => {
                 this.uris = urls;
                 this.prefetchedHtmls = prefetchedHtmls;
            })
		);

        this.subscription.add(
            spinnerService.subscribe(waiting => {
                this.spinner = waiting;
            })
        );
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
        // TODO: save uris to localstorage
        Observable.defer(async() => {
            const rawCarData: RawCarData = {carUrls: [], htmls: {}};
            for(const uri of nonEmptyUris) {
                rawCarData.carUrls.push(uri);
                if(Object.keys(this.prefetchedHtmls).includes(uri)) {
					rawCarData.htmls[uri] = this.prefetchedHtmls[uri];
				} else {
					const html =  await this.getCarHtml(uri);
					if(html) {
						rawCarData.htmls[uri] = html;
					}
				}
            }
            return rawCarData;
        }).take(1).subscribe((rawCarData: RawCarData) => {
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
                if(!requestUrl.includes(this.proxy)) {
                    return this.getCarHtml(this.proxy + '/' + requestUrl);
                }
                console.error('An error occurred:', err.error);
            });
    }

}
