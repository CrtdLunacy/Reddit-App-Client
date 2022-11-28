import React, { useEffect, useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { usePostData } from '../../hooks/usePostData';
import { createPostData } from '../../utils/react/createPostData';
import { getRandomInt } from '../../utils/react/getRandomInt';
import { postRequestAsync } from '../store/posts/actions';
import { Card } from './Card/Card';
import styles from './cardslist.css';


export function CardsList() {
  const { data, loading, error } = usePostData();
  const posts = createPostData(data);
  const dispatch = useDispatch();
  const [countState, setCountState] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  let countObserv = 0;
  console.log(data)


  const bottomOfList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        if(
          entries[0].isIntersecting &&
          entries[0].time > 3000 &&
          ((countObserv % 3) || countObserv === 0)
        ) {
          countObserv++;
          setCountState(prev => prev +1);
          dispatch<any>(postRequestAsync());
        }
      }, {
        rootMargin: '150px',
      });
    if(bottomOfList.current) observer.observe(bottomOfList.current)
    return () => {
      if(bottomOfList.current) observer.unobserve(bottomOfList.current)
    }
  }, [bottomOfList.current, buttonState])

  return (
    <ul className={styles.cardsList}>
     {loading && (
        <div style={{ margin: '20px' }}>⏳ Идет загрузка постов ⌛️</div>
     )}

     {!posts.length && !error && !loading &&(
        <div>😵‍💫 Хмм... здесь пока пусто</div>
     )}

    {posts.map( item =>
          <Card
          key={item.id + String(getRandomInt(1, 10))}
          id={item.id}
          image={item.previewImg}
          title={item.title}
          avatar={item.avatar}
          userName={item.author}
          rating={item.rating}
          comments={item.commentsCount}
          createDate={item.datePostUtc}
          commentHref={item.commentHref}
          >{item}</Card>
    )}
    {(countState !== 0) &&!(countState%3) &&(
      <button className={styles.uploadBtn} onClick={() => {
        countObserv++;
        setButtonState(!buttonState);
      }}>Загрузить еще</button>
    )}
    <div ref={bottomOfList} />
    {error && (<div>{error}</div>)}
    </ul>
  );
}
