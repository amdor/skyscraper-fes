import {Action} from '@ngrx/store';
import {CarData, RawCarData} from '../types/car-dto';
import {User} from 'firebase';

export const GET_CAR_DATA = '[Car Data] Get Car Data';
export const GET_SAVED_CAR_DATA = '[Car Data] Get Saved Car Data';
export const SAVE_CAR_DATA = '[Car Data] Save Car Data';
export const GET_CAR_DATA_SUCCESS = '[Car Data] Get Car Data Success';
export const GET_CAR_DATA_FAILED = '[Car Data] Get Failed';
export const RESET_SAVED_CAR_DATA = '[Car Data] Reset saved car data';
export const CAR_DATA_SUCCESS = '[Car Data] Car data success';
export const CAR_DATA_FAIL = '[Car Data] Car data fail';

/**
 * Load Individual Cars Form Actions
 */
export class GetCarDataAction implements Action {
	readonly type = GET_CAR_DATA;

	constructor(public rawData: RawCarData) {
	}
}

export class GetSavedCarDataAction implements Action {
	readonly type = GET_SAVED_CAR_DATA;

	constructor(public user: User) {
	}
}

export class SaveCarDataAction implements Action {
	readonly type = SAVE_CAR_DATA;

	constructor(public carData: CarData[], public user: User) {
	}
}

export class GetCarDataSuccessAction implements Action {
	readonly type = GET_CAR_DATA_SUCCESS;

	constructor(public carData: CarData[]) {
	}
}

export class ResetSavedCarDataAction implements Action {
	readonly type = RESET_SAVED_CAR_DATA;

	constructor() {
	}
}

export class CarDataSuccessAction implements Action {
	readonly type = CAR_DATA_SUCCESS;

	constructor(public msg: string) {
	}
}

export class CarDataFailAction implements Action {
	readonly type = CAR_DATA_FAIL;

	constructor(public msg: string) {
	}
}

export type CarDataActions = GetCarDataAction
	| GetSavedCarDataAction
	| SaveCarDataAction
	| GetCarDataSuccessAction
	| ResetSavedCarDataAction
	| CarDataSuccessAction
	| CarDataFailAction;
