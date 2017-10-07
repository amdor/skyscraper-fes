import {FormState} from './individual-cars-form/individual-cars-form.reducer';
export {UrlFieldState} from './individual-cars-form/individual-cars-form.reducer';
export {individualCarsFormReducer} from './individual-cars-form/individual-cars-form.reducer';

export interface AppState {
    individualCars: FormState
}