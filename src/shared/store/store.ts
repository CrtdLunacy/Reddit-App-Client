import { ActionCreator, Reducer } from "@reduxjs/toolkit";
import { MeRequestAction, MeRequestFailedAction, MeRequestSuccessAction, ME_REQUEST, ME_REQUEST_FAILED, ME_REQUEST_SUCCESS } from "./me/actions";
import { MeState, meReducer } from "./me/reducer";
import { PostsRequestAction, PostsRequestAfterAction, PostsRequestFailedAction, PostsRequestSuccessAction, POSTS_REQUEST, POSTS_REQUEST_AFTER, POSTS_REQUEST_FAILED, POSTS_REQUEST_SUCCESS } from "./posts/actions";
import { postsReducer, PostsState } from "./posts/reducer";
import { setTokenAction, SET_TOKEN } from "./saveToken/actions";
import { tokenReducer, tokenState } from "./saveToken/reducer";

export type RootState = {
  commentText: string;
  token: tokenState;
  me: MeState;
  posts: PostsState
}

const initialState: RootState = {
  commentText: 'Write something ...',
  token: {token: ''},
  me: {
    loading: false,
    error: '',
    data: {},
  },
  posts: {
    loading: false,
    error: '',
    data: [],
    after: '',
  }
}
const UPDATE_COMMENT = 'UPDATE_COMMENT';
type UpdateCommentAction = {
  type: typeof UPDATE_COMMENT;
  text: string;
}
export const updateComment: ActionCreator<UpdateCommentAction> = (text: string) => ({
  type: UPDATE_COMMENT,
  text,
});

type MyAction = UpdateCommentAction
  | setTokenAction
  | MeRequestAction
  | MeRequestSuccessAction
  | MeRequestFailedAction
  | PostsRequestAction
  | PostsRequestSuccessAction
  | PostsRequestAfterAction
  | PostsRequestFailedAction;



export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: tokenReducer(state.token, action),
      };
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_FAILED:
      return {
        ...state,
        me: meReducer(state.me, action),
      }
      case POSTS_REQUEST:
      case POSTS_REQUEST_SUCCESS:
      case POSTS_REQUEST_AFTER:
      case POSTS_REQUEST_FAILED:
        return {
          ...state,
          posts: postsReducer(state.posts, action),
        }
    default:
       return state;
  }

}
