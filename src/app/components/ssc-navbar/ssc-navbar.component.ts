import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {AppState, selectAuth2, selectIsSignedIn} from '../../reducers/index';
import {AuthLoadedAction} from '../../actions/auth.actions';
import {SetLanguageAction} from '../../actions/language.actions';


@Component({
	selector: 'ssc-navbar',
	templateUrl: './ssc-navbar.component.html',
	styleUrls: ['./ssc-navbar.component.scss']
})
export class SscNavbarComponent implements OnDestroy, OnInit {
	isCollapsed = true;
	auth2: any;
	profile: any;
	isSignedIn = false;
	subscription: Subscription = new Subscription;

	constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.subscription.add(this.store.select(selectAuth2).subscribe((auth2) => {
			if(auth2.currentUser) {
				this.auth2 = auth2;
				this.isSignedIn = this.auth2.currentUser.get().isSignedIn();
				this.profile = this.isSignedIn ? this.auth2.currentUser.get().getBasicProfile() : {};
				this.cdRef.detectChanges();
			}
		}));
		this.subscription.add(this.store.select(selectIsSignedIn).subscribe(isSignedIn => {
			this.isSignedIn = isSignedIn;
			this.cdRef.detectChanges();
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	login() {
		const options = {
			prompt: 'select_account',
			ux_mode: 'popup'
		};
		this.auth2.signIn(options).then(
			(googleUser) => {
				this.profile = googleUser.getBasicProfile();
				this.store.dispatch(new AuthLoadedAction(this.auth2));
			},
			(error) => {
				console.error(error);
			}
		);
	}

	logout() {
		this.auth2.signOut().then(() => {
			this.store.dispatch(new AuthLoadedAction(this.auth2));
		});
	}

	languageSelectionChanged(newVal: string) {
		this.store.dispatch(new SetLanguageAction(newVal));
	}

}
