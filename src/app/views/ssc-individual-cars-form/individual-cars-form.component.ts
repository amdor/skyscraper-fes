/**
 * Form for cars put in individually
 */
import {
    Component
} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {AppState, selectAuth2} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {SetAction, GetAction} from '../../actions';
import {SpinnerService} from '../../services/spinner.service';


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
        this.subscription.add(
            store.select(state => state.individualCars.urls).subscribe((urls) => {
                this.uris = urls;
            })
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

    addNewUrl(event: any, index: number) {
        this.store.dispatch(new SetAction(event.target.value, index));
    }

    getCarData() {
        this.spinner = true;
        this.store.dispatch(new GetAction(this.uris, this.idToken));
    }

    trackByIndex(elem, index) {
        return index;
    }

}
