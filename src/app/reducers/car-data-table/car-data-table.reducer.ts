import {CarDataActions, GET_CAR_DATA_SUCCESS} from './../../actions';
import {GetCarDataSuccessAction, RESET_SAVED_CAR_DATA} from '../../actions/car-data.actions';
import {CarData} from '../../types/car-dto';


export interface CarDataState {
	cars: Array<CarData>;
}

export const initialCarDataState: CarDataState = {
	cars: []
};

// TODO: when showing notification for save car data, update i18n files with translation
export function carDataTableReducer(state = initialCarDataState, action: CarDataActions): CarDataState {
	switch (action.type) {
		case GET_CAR_DATA_SUCCESS: {
			const getCarDataSuccessAction = action as GetCarDataSuccessAction;
			return {
				...state,
				cars: getCarDataSuccessAction.carData || []
			};
		}
		case RESET_SAVED_CAR_DATA: {
			return initialCarDataState;
		}
		default:
			return state;
	}
}
