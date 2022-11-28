import {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../shared/store/store';

interface ICommentsData {
  data: {
    id?: string
    body?:string
    author?:string
    created_utc?:string
    subreddit_name_prefixed?:string
  }
}

export const useCommentsData = (commentHref: string | undefined) => {
  const [data, setData] = useState<Array<ICommentsData>>([]);
  const token = useSelector<RootState, string>(state => state.token.token);

  useEffect(() => {
    axios.get(`https://oauth.reddit.com${commentHref}?showmore=true`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((resp) => {
      console.log(resp);
      const userData = resp.data[1].data.children;
      setData(userData);
    })
    .catch(console.log)
  }, [token])

  return [data]
};

