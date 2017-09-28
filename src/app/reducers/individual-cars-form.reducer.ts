import * as individualCarsForm from '../actions/individual-cars-form.actions';

export interface State {
  loading: boolean;
  entities: { [id: string]: any };
  result: string[];
}

export const initialState: State = {
  loading: false,
  entities: {},
  result: []
};

export function reducer(state = initialState, action: individualCarsForm.Actions): State {
  switch (action.type) {
    case individualCarsForm.LOAD: {
      return {
        ...state,
        loading: true
      }
    }

    case individualCarsForm.LOAD_SUCCESS: {

      return {
        ...state,
        loading: false,
      };
    }

     case individualCarsForm.LOAD_FAIL: {

      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}