import { Action } from '@ngrx/store';

export const SET =                 '[Individual Cars Form] Set';
export const SET_ALL =             '[Individual Cars Form] Set all';
export const REMOVE =              '[Individual Cars Form] Remove';

/**
 * Load Individual Cars Form Actions
 */
export class SetAction implements Action {
  readonly type = SET;

  constructor(public url: string, public index: number) { }
}

export class SetAllAction implements Action {
    readonly type = SET_ALL;

    constructor(public urls: string[], public prefetchedHtmls: any) { }
}

export class RemoveAction implements Action {
  readonly type = REMOVE;

  constructor(public index: number) { }
}

export type CarFormActions = RemoveAction
  | SetAction
  | SetAllAction;
