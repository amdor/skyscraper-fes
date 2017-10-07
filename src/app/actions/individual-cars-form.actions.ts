import { Action } from '@ngrx/store';
import { UrlFieldState } from './../reducers'

export const ADD =                 '[Individual Cars Form] Add';
export const SET =                 '[Individual Cars Form] Set';
export const REMOVE =              '[Individual Cars Form] Remove';

/**
 * Load Individual Cars Form Actions
 */
export class AddAction implements Action {
  readonly type = ADD;

  constructor() { }
}

export class SetAction implements Action {
  readonly type = SET;

  constructor(public url: UrlFieldState, public index: number) { }
}

export class RemoveAction implements Action {
  readonly type = REMOVE;

  constructor(public index: number) { }
}

export type CarFormActions = AddAction
  | RemoveAction
  | SetAction;