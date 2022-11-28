import React from 'react';
import { Controls } from './Controls';
import { Menu } from './Menu';
import { Preview } from './Preview';
import { TextContent } from './TextContent';
import styles from './card.css';
import { Routes, Route } from 'react-router-dom';
import { Post } from '../../Post';

interface ICardProps {
  children?: React.ReactNode;
  image?: string | undefined;
  title?: string | undefined;
  avatar?: string | undefined;
  userName?: string | undefined;
  rating?: string | undefined;
  comments?: string | undefined;
  createDate: string | undefined;
  commentHref: string | undefined;
  id?: string | undefined;
}

export function Card(props: ICardProps) {
  const {
    children,
    id,
    image,
    title,
    avatar,
    userName,
    rating,
    comments,
    createDate,
    commentHref
  } = props;

  return (
    <li className={styles.card}>
      <TextContent
        userAvatar={avatar}
        userName={userName}
        title={title}
        createDate={createDate}
        commentHref={commentHref}
        id={id}
      />
      <Preview image={image}/>
      <Menu />
      <Controls comments={comments} rating={rating} />
    </li>
  );
}
