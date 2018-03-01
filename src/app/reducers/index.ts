import {FormState} from './individual-cars-form/individual-cars-form.reducer';
import {CarDataState} from './car-data-table/car-data-table.reducer';
import {AuthState} from './auth/auth.reducer';
import {createSelector} from '@ngrx/store';


export {UrlFieldState} from './individual-cars-form/individual-cars-form.reducer';
export {individualCarsFormReducer} from './individual-cars-form/individual-cars-form.reducer';
export {carDataTableReducer} from './car-data-table/car-data-table.reducer';
export {authReducer} from './auth/auth.reducer';
export {CarData, CarDataState} from './car-data-table/car-data-table.reducer';

export interface AppState {
    individualCars: FormState;
    carData: CarDataState;
    googleAuth: AuthState;
}


export const selectAuthState = (state: AppState) => state.googleAuth;
export const selectAuth2 = createSelector(selectAuthState, (state: AuthState) => state.auth2);
export const selectIsSignedIn = createSelector(selectAuthState, (state: AuthState) => state.isSignedIn);

