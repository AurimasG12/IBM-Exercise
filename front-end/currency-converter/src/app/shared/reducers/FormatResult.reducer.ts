import { Action } from '@ngrx/store';
import * as FormatResultActions from '../actions/FormatResult.action';
import { FormatResult } from '../Models/FormatResult';

// Section 1

// Section 2
export function reducer(state: FormatResult[] = [], action: FormatResultActions.Actions) {
    // Section 3
    switch (action.type) {
        case FormatResultActions.ADD_FORMAT_RESULT:
            return [...state, action.payload];

        default:
            return state;
    }
}
