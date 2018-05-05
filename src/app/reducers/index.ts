import {FormState} from './individual-cars-form/individual-cars-form.reducer';
import {CarDataState} from './car-data-table/car-data-table.reducer';
import {AuthState} from './auth/auth.reducer';
import {createSelector} from '@ngrx/store';

export {individualCarsFormReducer} from './individual-cars-form/individual-cars-form.reducer';
export {carDataTableReducer} from './car-data-table/car-data-table.reducer';
export {authReducer} from './auth/auth.reducer';
export {languageReducer} from './language/language.reducer';
export {CarDataState} from './car-data-table/car-data-table.reducer';

export interface AppState {
    individualCars: FormState;
    carData: CarDataState;
    googleAuth: AuthState;
    language: string;
}


export const selectAuthState = (state: AppState) => state.googleAuth;
export const selectAuth2 = createSelector(selectAuthState, (state: AuthState) => state.auth2);
export const selectIsSignedIn = createSelector(selectAuthState, (state: AuthState) => state.isSignedIn);

export const selectIndividualCarsState = (state: AppState) => state.individualCars;
export const selectIndividualCarUrls = createSelector(selectIndividualCarsState, (state: FormState) => state.urls);
export const selectIndividualCarHtmls = createSelector(selectIndividualCarsState, (state: FormState) => state.prefetchedHtmls);

