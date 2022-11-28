import React, { useState } from 'react';
import { AnswerForm } from '../../AnswerForm';
import { CreateDate } from '../../CardsList/Card/TextContent/CreateDate';
import { UserLink } from '../../CardsList/Card/TextContent/UserLink';
import { EIcons, Icon } from '../../Icon';
import { EColor, Text } from '../../Text';
import styles from './postcomment.css';

interface IPostCommentProps {
  avatar?: string | undefined
  name?: string | undefined
  date?: string | undefined
  subred?: string | undefined
  commentText: string | undefined
}

export function PostComment(props: IPostCommentProps) {
  const {
    avatar,
    name,
    date,
    subred,
    commentText
  } = props;

  const [answerState, setAnswerState] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.opener__wrap}>
        <button className={styles.up} >
          <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 0L0 10H19L9.5 0Z" fill="#D9D9D9"/>
          </svg>
        </button>
        <button className={styles.down}>
          <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 10L19 0L8.74228e-07 -1.66103e-06L9.5 10Z" fill="#D9D9D9"/>
          </svg>
        </button>
        <div className={styles.line}></div>
      </div>
      <div className={styles.content__wrap}>
        <div className={styles.head}>
          <UserLink userAvatar={'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg'} userName={name}/>
          <CreateDate createDate={date} />
          <div className={styles.subred}>{subred}</div>
        </div>
        <div className={styles.text}>
          {commentText}
        </div>
        <div className={styles.button__wrap}>
          <Icon name={EIcons.comment} />
          <Text
            size={14}
            color={EColor.grey99}
            marginLeft={10}
            marginRight={28}
            cursor={"pointer"}
            onClick={() => setAnswerState(!answerState)}
          >Ответить</Text>
          <Icon name={EIcons.share} />
          <Text
            size={14}
            color={EColor.grey99}
            marginLeft={10}
            marginRight={28}
            cursor={"pointer"}
          >Поделиться</Text>
          <Icon name={EIcons.warn} />
          <Text
            size={14}
            color={EColor.grey99}
            marginLeft={10}
            cursor={"pointer"}
          >Пожаловаться</Text>
        </div>
      </div>
      {answerState &&
        <div className={styles.form__wrap}>
          <AnswerForm name={name} />
        </div>
      }
    </div>
  );
}
