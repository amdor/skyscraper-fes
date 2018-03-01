import {AuthActions, AUTH_LOADED, AuthLoadedAction} from '../../actions';

export interface AuthState {
    auth2: any;
}

export const initialAuthState: AuthState = {
    auth2: {}
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
        default:
            return state;
    }
}

