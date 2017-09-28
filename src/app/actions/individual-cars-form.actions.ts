import { Action } from '@ngrx/store';

export const LOAD =                 '[Individual Cars Form] Load';
export const LOAD_SUCCESS =         '[Individual Cars Form] Load Success';
export const LOAD_FAIL =            '[Individual Cars Form] Load Fail';

/**
 * Load Individual Cars Form Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}

export type Actions = LoadAction
  | LoadSuccessAction
  | LoadFailAction;