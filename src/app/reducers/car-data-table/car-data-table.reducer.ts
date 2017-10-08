import { Action } from '@ngrx/store';
import { CarDataActions, GET_SUCCESS, GET_FAILED } from './../../actions/car-data.actions';


export interface CarDataState {
  cars: Array<CarData>
}

export interface CarData {
  CarUri: string,
  age: string,
  condition: string,
  mass: string,
  power: string,
  price: string,
  speedometer: string,
  trunk: string
}

export const initialCarDataState: CarDataState = {
  cars: []
};

export function carDataTableReducer(state = initialCarDataState, action: CarDataActions): CarDataState {
  switch (action.type) {
    case GET_SUCCESS: {
      return {
        ...state,
        cars: action.carData
      }
    }
    case GET_FAILED: {
      console.log("Failed to get car data.");
      return state;
    }
    default: return state;
  }
}