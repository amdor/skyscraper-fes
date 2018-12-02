import {Action} from '@ngrx/store';
import {CarData, RawCarData} from '../types/car-dto';
import {User} from 'firebase';

export const GET_CAR_DATA = '[Car Data] Get Car Data';
export const GET_SAVED_CAR_DATA = '[Car Data] Get Saved Car Data';
export const SAVE_CAR_DATA = '[Car Data] Save Car Data';
export const GET_CAR_DATA_SUCCESS = '[Car Data] Get Car Data Success';
export const GET_CAR_DATA_FAILED = '[Car Data] Get Failed';
export const RESET_SAVED_CAR_DATA = '[Car Data] Reset saved car data';

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

	constructor(public idToken: string) {
	}
}

export class GetCarDataSuccessAction implements Action {
	readonly type = GET_CAR_DATA_SUCCESS;

	constructor(public carData: CarData[]) {
	}
}

export class GetCarDataFailedAction implements Action {
	readonly type = GET_CAR_DATA_FAILED;

	constructor() {
	}
}

export class ResetSavedCarDataAction implements Action {
	readonly type = RESET_SAVED_CAR_DATA;

	constructor() {
	}
}

export type CarDataActions = GetCarDataAction
	| GetSavedCarDataAction
	| GetCarDataSuccessAction
	| GetCarDataFailedAction
	| ResetSavedCarDataAction;
