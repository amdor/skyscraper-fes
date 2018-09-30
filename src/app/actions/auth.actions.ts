import {Action} from '@ngrx/store';
import {User} from 'firebase/auth';

export const USER_LOADED = '[Auth] User loaded';
export const AUTH_SIGN_IN_STATUS_CHANGED = '[Auth] Sign in status changed';
export const AUTH_SIGN_IN = '[Auth] Sign in';
export const AUTH_SIGN_OUT = '[Auth] Sign out';

/**
 *  Authentication actions
 */
export class UserLoadedAction implements Action {
	readonly type = USER_LOADED;

	constructor(public user: User) {
	}

}

export class SignInStatusChange implements Action {
	readonly type = AUTH_SIGN_IN_STATUS_CHANGED;

	constructor(public user: User, public isSignedIn: boolean) {
	}
}

export class SignInAction implements Action {
	readonly type = AUTH_SIGN_IN;

	constructor() {
	}
}

export class SignOutAction implements Action {
	readonly type = AUTH_SIGN_OUT;

	constructor() {
	}
}

export type AuthActions = UserLoadedAction
	| SignInStatusChange
	| SignInAction;
