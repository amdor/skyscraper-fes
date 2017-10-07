import { FormState } from './individual-cars-form/individual-cars-form.reducer';
import { CarDataState } from './car-data-table/car-data-table.reducer';


export { UrlFieldState } from './individual-cars-form/individual-cars-form.reducer';
export { individualCarsFormReducer } from './individual-cars-form/individual-cars-form.reducer';

export interface AppState {
    individualCars: FormState,
    carData: CarDataState
}