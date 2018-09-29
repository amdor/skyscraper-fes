import {Action} from '@ngrx/store';

export const AUTH_LOADED = '[Auth] Auth loaded';
export const AUTH_SIGN_IN_STATUS_CHANGED = '[Auth] Sign in status changed';

/**
 *  Authentication actions
 */
export class AuthLoadedAction implements Action {
	readonly type = AUTH_LOADED;

	constructor(public auth2: any) {
	}

}

export class SignInStatusChange implements Action {
	readonly type = AUTH_SIGN_IN_STATUS_CHANGED;

	constructor(public isSignedIn: boolean) {
	}
}

export type AuthActions = AuthLoadedAction
	| SignInStatusChange;
