import { Reducer } from "react";
import { setTokenAction, SET_TOKEN } from "./actions";

export type tokenState = {
  token: string;
}

type tokenAction = setTokenAction;

export const tokenReducer: Reducer<tokenState, tokenAction> = (state, action) => {
  switch(action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    default:
      return state;
  }
}
