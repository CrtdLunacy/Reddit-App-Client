import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const SET_TOKEN = 'SET_TOKEN';
export type setTokenAction = {
  type: typeof SET_TOKEN;
  token: string;
}

export const setToken: ActionCreator<setTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  token,
});

export const saveToken = (token: string): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    dispatch(setToken(token));
}
