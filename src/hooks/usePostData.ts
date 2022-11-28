import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../shared/store/store';
import { IPostData, postRequestAsync } from '../shared/store/posts/actions';
import { useDispatch } from 'react-redux';

export const usePostData = () => {
  const data = useSelector<RootState, IPostData>(state => state.posts.data);
  const loading = useSelector<RootState, boolean>(state => state.posts.loading);
  const error = useSelector<RootState, string>(state => state.posts.error);
  const token = useSelector<RootState, string>(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token && token.length > 0 && token !== 'undefined') {
      dispatch<any>(postRequestAsync());
    }
  }, [token])

  return {
    data,
    loading,
    error,
  }
};
