import {Action} from '@ngrx/store'


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

export function carDataTableReducer(state = initialCarDataState, action: Action): CarDataState {
  switch (action.type) {

    default: return state;
  }
}