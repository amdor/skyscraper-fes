import {CarDataActions, GET_FAILED, GET_SUCCESS} from './../../actions';
import {GetSuccessAction} from '../../actions/car-data.actions';


export interface CarDataState {
    cars: Array<CarData>;
}

export interface CarData {
    CarUri: string;
    age: string;
    condition: string;
    mass: string;
    power: string;
    price: string;
    speedometer: string;
    trunk: string;
    worth: number;
}

export const initialCarDataState: CarDataState = {
    cars: []
};

export function carDataTableReducer(state = initialCarDataState, action: CarDataActions): CarDataState {
    switch(action.type) {
        case GET_SUCCESS: {
            const localAction = action as GetSuccessAction;
            return {
                ...state,
                cars: localAction.carData
            };
        }
        case GET_FAILED: {
            console.error('Failed to get car data.');
            return state;
        }
        default:
            return state;
    }
}
