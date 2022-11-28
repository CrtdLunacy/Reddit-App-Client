import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.css';


interface IDropdownProps {
  button?: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  rectes?: {
    top: number;
    left: number;
  }
}

interface ICoordinates {
  top: number,
  left: number,
}

const NOOP = () => {};

export function Dropdown({button, children, isOpen, onOpen = NOOP, onClose = NOOP, rectes}: IDropdownProps) {
  const node = document.getElementById('dropdown_root');
  if(!node) return null;
  const [isOpenDrop, setIsOpenDrop] = useState(isOpen);
  useEffect(() => setIsOpenDrop(isOpen), [isOpen]);
  useEffect(() => isOpenDrop ? onOpen() : onClose(), [isOpenDrop]);

  const hadleDropdownState = () => {
    if(isOpen === undefined) {
      setIsOpenDrop(!isOpenDrop)
    }
  };

  return ReactDOM.createPortal((
    <div className={styles.container} style={{
      top: rectes?.top,
      left: rectes?.left
    }}>
      <div className={styles.dropBtn} onClick={hadleDropdownState}>
        {button}
      </div>
      <div className={styles.listWrap}>
      {isOpenDrop && (
          <div className={styles.listContainer}>
            <div className={styles.list} onClick={() => setIsOpenDrop(false)}>
              {children}
            </div>
          </div>

      )}
      </div>

    </div>
  ), node);
}
