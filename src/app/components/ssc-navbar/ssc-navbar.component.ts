import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare const gapi: any;

@Component({
    selector: 'ssc-navbar',
    templateUrl: './ssc-navbar.component.html',
    styleUrls: ['./ssc-navbar.component.scss']
})
export class SscNavbarComponent implements AfterViewInit {


    clientId = '498731538493-etubco5p4at0chs18tuqmqmm8g3ngtr1.apps.googleusercontent.com';
    isCollapsed = true;
    auth2: any;
    profile: any;
    isSignedIn = false;

    constructor() {
        this.googleInit();
        console.log(this.profile);
    }

    ngAfterViewInit() {
    }

    public googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: this.clientId,
            });
            this.auth2.isSignedIn.listen((isSignedIn) => {
                this.isSignedIn = isSignedIn;
                console.log('signed in listener ' + isSignedIn);
                if(!isSignedIn) {
                    gapi.signin2.render('googleLogin', {
                        'theme': 'light'
                    });
                } else {
                    this.profile = this.auth2.currentUser.get().getBasicProfile()
                }
            });
            this.isSignedIn = this.auth2.isSignedIn.get();
            if(this.isSignedIn) {
                this.profile = this.auth2.currentUser.get().getBasicProfile()
            }
        });
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
