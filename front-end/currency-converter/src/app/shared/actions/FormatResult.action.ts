import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FormatResult } from '../Models/FormatResult';

export const ADD_FORMAT_RESULT = '[FORMATRESULT] Add';

export class AddFormatResult implements Action {
    readonly type = ADD_FORMAT_RESULT;

    constructor(public payload: FormatResult) {}
}

export type Actions = AddFormatResult;
