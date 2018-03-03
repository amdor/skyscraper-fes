/**
 * Form for cars put in individually
 */
import {
    Component
} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {AppState} from '../../reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {SetAction, RemoveAction, GetAction} from '../../actions';
import {SpinnerService} from '../../services/spinner.service';


@Component({
    selector: 'ssc-individual-cars-form',
    templateUrl: './individual-cars-form.component.html',
    styleUrls: ['./individual-cars-form.component.scss']
})
export class IndividualCarsFormComponent implements OnDestroy {
    uris: string[];
    spinner = false;
    private subscription: Subscription = new Subscription();

    constructor(private store: Store<AppState>, private spinnerService: SpinnerService) {
        this.subscription.add(
            store.select(state => state.individualCars.urls).subscribe((urls) => {
                this.uris = urls;
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

    addNewUrl(event: any, index: number) {
        this.store.dispatch(new SetAction(event.target.value, index));
    }

    getCarData() {
        this.spinner = true;
        this.store.dispatch(new GetAction(this.uris));
    }

    trackByIndex(elem, index) {
        return index;
    }

}
