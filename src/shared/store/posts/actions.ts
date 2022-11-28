import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const POSTS_REQUEST = 'POSTS_REQUEST';
export type PostsRequestAction = {
  type: typeof POSTS_REQUEST;
};
export const myRequest: ActionCreator<PostsRequestAction> = () => ({
  type: POSTS_REQUEST,
});

interface IPostItem {
  kind: string,
  data: {
    id?: string;
    title?: string;
    author: string;
    created_utc: string;
    subreddit_name_prefixed: string;
    body: string;
    permalink?:string;
    url: string;
  }
}

type PostAfter = string;

export type IPostData = Array<IPostItem>;

export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export type PostsRequestSuccessAction = {
  type: typeof POSTS_REQUEST_SUCCESS;
  data: IPostData;
};
export const mySuccessRequest: ActionCreator<PostsRequestSuccessAction> = (data: IPostData) => ({
  type: POSTS_REQUEST_SUCCESS,
  data,
});

export const POSTS_REQUEST_AFTER = 'POSTS_REQUEST_AFTER';
export type PostsRequestAfterAction = {
  type: typeof POSTS_REQUEST_AFTER;
  after: PostAfter;
};
export const myAfterRequest: ActionCreator<PostsRequestAfterAction> = (after: PostAfter) => ({
  type: POSTS_REQUEST_AFTER,
  after,
});

export const POSTS_REQUEST_FAILED = 'POSTS_REQUEST_FAILED';
export type PostsRequestFailedAction = {
  type: typeof POSTS_REQUEST_FAILED;
  error: string;
};
export const myFailedRequest: ActionCreator<PostsRequestFailedAction> = (error: string) => ({
  type: POSTS_REQUEST_FAILED,
  error,
});

export const postRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(myRequest());
  axios.get('https://oauth.reddit.com/best.json?sr_detail=true', {
    headers: { Authorization: `Bearer ${getState().token.token}` },
    params: {
      limit: 10,
      after: getState().posts.after
    }
  })
  .then((resp) => {
    const {after, children} = resp.data.data;
    const data = getState().posts.data.concat(...children);
    dispatch(myAfterRequest(after));
    dispatch(mySuccessRequest(data));
  })
  .catch(((e) => {
    console.log(e);
    if(e.response.status === 400) return dispatch(myFailedRequest('Сервер недоступен, попробуйте позже.'))
    dispatch(myFailedRequest(String(e)))
  }))
}
