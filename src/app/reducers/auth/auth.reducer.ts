import {AuthActions, USER_LOADED, UserLoadedAction, SIGN_IN_STATUS_CHANGE, SignInStatusChange} from '../../actions';
import {User} from 'firebase/auth';


export interface AuthState {
	user: User;
	isSignedIn: boolean;
}

export const initialAuthState: AuthState = {
	user: null,
	isSignedIn: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case USER_LOADED: {
			const localAction = action as UserLoadedAction;
			return {
				...state,
				isSignedIn: !!localAction.user,
				user: localAction.user
			};
		}
		case SIGN_IN_STATUS_CHANGE: {
			const localAction = action as SignInStatusChange;
			return {
				...state,
				user: localAction.user || null,
				isSignedIn: localAction.isSignedIn
			};
		}
		default:
			return state;
	}
}

