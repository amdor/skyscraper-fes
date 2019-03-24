import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../reducers/index';
import {SignInAction, SignOutAction} from '../../actions/auth.actions';
import {SetLanguageAction} from '../../actions/language.actions';
import {AuthState} from '../../reducers/auth/auth.reducer';


@Component({
	selector: 'ssc-navbar',
	templateUrl: './ssc-navbar.component.html',
	styleUrls: ['./ssc-navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SscNavbarComponent implements OnDestroy, OnInit {
	isCollapsed = true;
	userPhotoUrl: any;
	isSignedIn = false;
	subscription: Subscription = new Subscription;

	constructor(private readonly store: Store<AppState>, private readonly cdRef: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.subscription.add(this.store.pipe(select(selectAuthState)).subscribe((authState: AuthState) => {
			this.isSignedIn = authState.isSignedIn;
			this.userPhotoUrl = this.isSignedIn ? authState.user.photoURL : '';
			this.cdRef.markForCheck();
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	login() {
		this.store.dispatch(new SignInAction());
	}

	logout() {
		this.store.dispatch(new SignOutAction());
	}

	languageSelectionChanged(newVal: string) {
		this.store.dispatch(new SetLanguageAction(newVal));
	}

}
