import {CarDataActions, GET_FAILED, GET_CAR_DATA_SUCCESS} from './../../actions';
import {GetSuccessAction} from '../../actions/car-data.actions';
import {CarData} from '../../types/car-dto';


export interface CarDataState {
    cars: Array<CarData>;
}

export const initialCarDataState: CarDataState = {
    cars: []
};

export function carDataTableReducer(state = initialCarDataState, action: CarDataActions): CarDataState {
    switch(action.type) {
        case GET_CAR_DATA_SUCCESS: {
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
