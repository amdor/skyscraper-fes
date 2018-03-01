import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';


@Component({
    selector: 'ssc-navbar',
    templateUrl: './ssc-navbar.component.html',
    styleUrls: ['./ssc-navbar.component.scss']
})
export class SscNavbarComponent implements OnInit {


    isCollapsed = true;
    auth2: any;
    profile: any;
    isSignedIn = false;
    subscription: Subscription;

    constructor(private store: Store<AppState>) {
        this.subscription = store.select(state => state.googleAuth).subscribe((googleAuth) => {
            this.auth2 = googleAuth.auth2;
        });
    }

    ngOnInit() {
    }

    login() {
        if(this.isSignedIn) {
            return;
        }
        const options = {
            prompt: 'select_account',
            ux_mode: 'popup'
        };
        this.auth2.signIn(options).then(
            (googleUser) => {
                this.profile = googleUser.getBasicProfile();
            },
            (error) => {
                console.error(error);
            }
        );
    }

}
