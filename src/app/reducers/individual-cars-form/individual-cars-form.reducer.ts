import {CarFormActions, ADD, SET} from './../../actions/individual-cars-form.actions';

export interface FormState {
  urls: string[];
}

export const initialFormState: FormState = {
  urls: ['']
};

export function individualCarsFormReducer(state = initialFormState, action: CarFormActions): FormState {
  switch (action.type) {
    case ADD: {

      state.urls.push(action.url);
      return {
        ...state,
        urls: state.urls
      };
    }
    case SET: {
      state.urls[action.index] = action.url;
      return {
        ...state,
        urls: state.urls
      };
    }
    default: {
      return state;
    }
  }
}