import {Action} from '@ngrx/store';
import {CarData} from './../reducers';

export const GET = '[Car Data] Get';
export const GET_SUCCESS = '[Car Data] Get Success';
export const GET_FAILED = '[Car Data] Get Failed';

/**
 * Load Individual Cars Form Actions
 */
export class GetAction implements Action {
    readonly type = GET;

    constructor(public urlValues: string[]) {
    }
}

export class GetSuccessAction implements Action {
    readonly type = GET_SUCCESS;

    constructor(public carData: CarData[]) {
    }
}

export class GetFailedAction implements Action {
    readonly type = GET_FAILED;

    constructor() {
    }
}

export type CarDataActions = GetAction
    | GetSuccessAction
    | GetFailedAction;
