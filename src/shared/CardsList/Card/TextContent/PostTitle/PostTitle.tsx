import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../../../Post';
import styles from './posttitle.css';

interface IPostTitleProps {
  title: string | undefined;
  commentHref: string | undefined;
  id: string | undefined;
}

export function PostTitle({ title, commentHref, id }: IPostTitleProps) {

  return (
    <h2 className={styles.title}>
      <Link to={`/posts/${id}`} className={styles.postLink} >
        {title}
      </Link>
    </h2>
  );
}
