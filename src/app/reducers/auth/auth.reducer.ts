import {AuthActions, AUTH_LOADED, AuthLoadedAction, AUTH_SIGN_IN_STATUS_CHANGED, SignInStatusChange} from '../../actions';


export interface AuthState {
	auth2: any;
	isSignedIn: boolean;
	idToken: string;
}

export const initialAuthState: AuthState = {
	auth2: {},
	isSignedIn: false,
	idToken: ''
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case AUTH_LOADED: {
			const localAction = action as AuthLoadedAction;
			const isSignedIn = localAction.auth2.currentUser.get().isSignedIn() || false;
			return {
				auth2: localAction.auth2 || {},
				isSignedIn: isSignedIn,
				idToken: localAction.auth2.currentUser.get().getAuthResponse().id_token
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

