import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../shared/store/store';
import { useDispatch } from 'react-redux';
import { IUserData, meRequestAsync } from '../shared/store/me/actions'

export const useUserData = () => {
  const data = useSelector<RootState, IUserData>(state => state.me.data);
  const loading = useSelector<RootState, boolean>(state => state.me.loading);

  const token = useSelector<RootState, string>(state => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token && token.length > 0 && token !== 'undefined'){
      dispatch<any>(meRequestAsync());
    }
  }, [token])

  return {
    data,
    loading,
  }
};
