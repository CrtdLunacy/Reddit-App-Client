import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const ME_REQUEST = 'ME_REQUEST';
export type MeRequestAction = {
  type: typeof ME_REQUEST;
};
export const myRequest: ActionCreator<MeRequestAction> = () => ({
  type: ME_REQUEST,
});

export interface IUserData {
  name?: string
  iconImg?: string
}

export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS';
export type MeRequestSuccessAction = {
  type: typeof ME_REQUEST_SUCCESS;
  data: IUserData;
};
export const mySuccessRequest: ActionCreator<MeRequestSuccessAction> = (data: IUserData) => ({
  type: ME_REQUEST_SUCCESS,
  data,
});

export const ME_REQUEST_FAILED = 'ME_REQUEST_FAILED';
export type MeRequestFailedAction = {
  type: typeof ME_REQUEST_FAILED;
  error: string;
};
export const myFailedRequest: ActionCreator<MeRequestFailedAction> = (error: string) => ({
  type: ME_REQUEST_FAILED,
  error,
});

export const meRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(myRequest());
  axios.get('https://oauth.reddit.com/api/v1/me', {
    headers: { Authorization: `Bearer ${getState().token.token}` }
  })
  .then((resp) => {
    const userData = resp.data;
    dispatch(mySuccessRequest({ name: userData.name, iconImg: userData.icon_img.split('?')[0] }));
  })
  .catch(((e) => {
    console.log(e);
    dispatch(myFailedRequest(String(e)))
  }))
}
