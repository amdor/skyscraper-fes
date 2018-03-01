import {Action} from '@ngrx/store';

export const AUTH_LOADED = '[Auth] Auth loaded';

/**
 *  Authentication actions
 */
export class AuthLoadedAction implements Action {
    readonly type = AUTH_LOADED;

    constructor(public auth2: any) {
    }
}

export type AuthActions = AuthLoadedAction;
