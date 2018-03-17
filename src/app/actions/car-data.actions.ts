import {Action} from '@ngrx/store';
import {CarData, RawCarData} from '../types/car-dto';

export const GET_CAR_DATA = '[Car Data] Get Car Data';
export const GET_CAR_DATA_SUCCESS = '[Car Data] Get Car Data Success';
export const GET_FAILED = '[Car Data] Get Failed';

/**
 * Load Individual Cars Form Actions
 */
export class GetCarDataAction implements Action {
    readonly type = GET_CAR_DATA;

    constructor(public rawData: RawCarData) {
    }
}

export class GetSuccessAction implements Action {
    readonly type = GET_CAR_DATA_SUCCESS;

    constructor(public carData: CarData[]) {
    }
}

export class GetFailedAction implements Action {
    readonly type = GET_FAILED;

    constructor() {
    }
}

export type CarDataActions = GetCarDataAction
    | GetSuccessAction
    | GetFailedAction;
