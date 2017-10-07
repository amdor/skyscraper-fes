import {CarFormActions, ADD, SET, REMOVE} from './../../actions/individual-cars-form.actions';

export interface FormState {
  urls: UrlFieldState[];
}

export interface UrlFieldState {
  value: string,
  show: boolean
}

export const initialFormState: FormState = {
  urls: function() {
    let retVal = new Array<UrlFieldState>(10).fill({value: '', show: false}, 1);
    retVal[0] = {value: '', show: true};
    return retVal;
  }()
};

export function individualCarsFormReducer(state = initialFormState, action: CarFormActions): FormState {
  switch (action.type) {
    case ADD: {
      let addIndex = state.urls.findIndex(element => element.show === false);
      if(addIndex === -1) {
        return state;
      }
      let newUrls: Array<UrlFieldState> = [...state.urls];
      newUrls[addIndex] = {value: '', show: true};
      return {
        ...state,
        urls: newUrls
      };
    }
    case REMOVE: {
      let newUrls: Array<UrlFieldState> = [...state.urls];
      newUrls[action.index].show = false;
      return {
        ...state,
        urls: newUrls
      };
    }
    case SET: {
      let newUrls: Array<UrlFieldState> = [...state.urls];
      newUrls[action.index] = action.url;
      return {
        ...state,
        urls: newUrls
      };
    }
    default: {
      return state;
    }
  }
}