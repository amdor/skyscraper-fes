import {CarFormActions, SET, REMOVE} from './../../actions';

export interface FormState {
    urls: string[];
}

export const initialFormState: FormState = {
    urls: function() {

        let storageUrls = JSON.parse(localStorage.getItem('htmls'));
        storageUrls = storageUrls ? Object.keys(storageUrls) : [];
        const retVal = new Array<string>(10);
        if(storageUrls.length) {
            for(let i = 0; i < retVal.length; i++) {
                const url = storageUrls[i];
                retVal[i] = url || '';
            }
        } else {
            retVal.fill('');
        }
        return retVal;
    }()
};

export function individualCarsFormReducer(state = initialFormState, action: CarFormActions): FormState {
    switch(action.type) {
        case REMOVE: {
            const newUrls: Array<string> = [...state.urls];
            newUrls[action.index] = '';
            return {
                ...state,
                urls: newUrls
            };
        }
        case SET: {
            const newUrls: Array<string> = [...state.urls];
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
