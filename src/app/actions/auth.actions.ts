import {Action} from '@ngrx/store';
import {User} from 'firebase/auth';

export const USER_LOADED = '[Auth] User loaded';
export const SIGN_IN_STATUS_CHANGE = '[Auth] Sign in status changed';
export const SIGN_IN = '[Auth] Sign in';
export const SIGN_OUT = '[Auth] Sign out';

/**
 *  Authentication actions
 */
export class UserLoadedAction implements Action {
	readonly type = USER_LOADED;

	constructor(public user: User) {
	}

}

export class SignInStatusChange implements Action {
	readonly type = SIGN_IN_STATUS_CHANGE;

	constructor(public user: User, public isSignedIn: boolean) {
	}
}

export class SignInAction implements Action {
	readonly type = SIGN_IN;

	constructor() {
	}
}

export class SignOutAction implements Action {
	readonly type = SIGN_OUT;

	constructor() {
	}
}

export type AuthActions = UserLoadedAction
	| SignInStatusChange
	| SignInAction;
