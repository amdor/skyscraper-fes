/**
 * Form for cars put in individually
 */
import {Component, OnDestroy} from '@angular/core';
import {AppState, selectAuth2} from '../../reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {GetAction, SetAction} from '../../actions';
import {SpinnerService} from '../../services/spinner.service';
import 'rxjs/add/operator/take';


@Component({
    selector: 'ssc-individual-cars-form',
    templateUrl: './individual-cars-form.component.html',
    styleUrls: ['./individual-cars-form.component.scss']
})
export class IndividualCarsFormComponent implements OnDestroy {
    uris: string[];
    spinner = false;
    private idToken = '';
    private subscription: Subscription = new Subscription();

    constructor(private store: Store<AppState>, private spinnerService: SpinnerService) {
        store.select(state => state.individualCars.urls).take(1).subscribe((urls) => {
                this.uris = urls;
            }
        );

        this.subscription.add(this.store.select(selectAuth2).subscribe((auth2) => {
            if(auth2.currentUser) {
                const currentUser = auth2.currentUser.get();
                const isSignedIn = currentUser.isSignedIn();
                this.idToken = isSignedIn ? currentUser.getAuthResponse().id_token : '';
            }
        }));
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

    getCarData() {
        this.spinner = true;
        this.store.dispatch(new GetAction(this.uris));
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

}
