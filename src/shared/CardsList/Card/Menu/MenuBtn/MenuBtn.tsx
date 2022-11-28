import React, { ReactNode } from 'react';
import MenuIcon from '../../../../Icons/MenuIcon';
import styles from './menubtn.css';

interface IMenuBtnProps {
  onClick?: () => void;
}

export function MenuBtn({ onClick }: IMenuBtnProps) {
  return (
    <button className={styles.menuButton} onClick={onClick}>
      <MenuIcon />
    </button>
  );
}
