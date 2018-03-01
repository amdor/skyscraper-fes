import {AuthActions, AUTH_LOADED, AuthLoadedAction, AUTH_SIGN_IN_STATUS_CHANGED, SignInStatusChange} from '../../actions';


export interface AuthState {
    auth2: any;
    isSignedIn: boolean;
}

export const initialAuthState: AuthState = {
    auth2: {},
    isSignedIn: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch(action.type) {
        case AUTH_LOADED: {
            const localAction = action as AuthLoadedAction;
            return {
                ...state,
                auth2: localAction.auth2
            };
        }
        case AUTH_SIGN_IN_STATUS_CHANGED: {
            const localAction = action as SignInStatusChange;
            return {
                ...state,
                isSignedIn: localAction.isSignedIn
            };
        }
        default:
            return state;
    }
}

