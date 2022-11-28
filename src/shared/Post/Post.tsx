import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCommentsData } from '../../hooks/useCommentsData';
import { CommentForm } from '../CommentForm';
import { IPostData } from '../store/posts/actions';
import { RootState } from '../store/store';
import styles from './post.css';
import { PostComment } from './PostComment';

interface IPostProps {
  title?: string | undefined;
}

export function Post({ title }: IPostProps) {
  const node = document.getElementById('modal_root');
  if(!node) return null;
  const id = window.location.pathname.split('/').slice(2,3).join('');
  const data = useSelector<RootState, IPostData>(state => state.posts.data);
  const postDat = data.filter( item => item.data.id === id);
  const modalRef = useRef<HTMLDivElement>(null);
  const [comments] = useCommentsData(postDat[0].data.permalink);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if(e.target instanceof Node && !modalRef.current?.contains(e.target))
      navigate('/');
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])


  return ReactDOM.createPortal((
    <div className={styles.modal} ref={modalRef}>
      <h2 >
       {postDat[0].data.title}
      </h2>

      <div className={styles.content}>
        <div>
          {postDat[0].data.url && (
            <img src={postDat[0].data.url}></img>
          )}
        </div>
      <CommentForm />
       {
         comments.map(item =>
          <PostComment
            key={item.data.id}
            name={item.data.author}
            date={item.data.created_utc}
            subred={item.data.subreddit_name_prefixed}
            commentText={item.data.body}
          />
         )
       }
      </div>



      <div>

      </div>
    </div>
  ), node);
}
