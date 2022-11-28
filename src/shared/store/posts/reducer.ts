import { Reducer } from "react";
import {
  IPostData,
  PostsRequestAction,
  PostsRequestAfterAction,
  PostsRequestFailedAction,
  PostsRequestSuccessAction,
  POSTS_REQUEST,
  POSTS_REQUEST_AFTER,
  POSTS_REQUEST_FAILED,
  POSTS_REQUEST_SUCCESS
} from "./actions";

export type PostsState = {
  loading: boolean;
  error: string;
  data: IPostData;
  after: string;
}

type MeActions = PostsRequestAction
| PostsRequestSuccessAction
| PostsRequestAfterAction
| PostsRequestFailedAction;

export const postsReducer: Reducer<PostsState, MeActions> = (state, action) => {
  switch(action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case POSTS_REQUEST_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    case POSTS_REQUEST_AFTER:
      return {
        ...state,
        after: action.after,
      }
    default:
      return state;
  }
}
