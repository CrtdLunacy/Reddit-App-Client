import React, {useState, useEffect, useRef} from 'react';
import { useIsSsr } from '../../../../hooks/useSsr';
import { Dropdown } from '../../../Dropdown';
import { EColor, Text } from '../../../Text';
import { DesktopMenuItemList } from './DesktopMenuItemList';
import { MenuBtn } from './MenuBtn/MenuBtn';
import { MenuItemList } from './MenuItemList';
import styles from './menu.css';

interface ICoordinates {
  top: number;
  left: number;
}

export function Menu() {
  const isSsr = useIsSsr();
  const width = (isSsr) ? undefined : window.innerWidth;
  const [size, setSize] = useState(width);
  const [openDrop, setOpenDrop] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [coord, setCoord] = useState<ICoordinates>({
    top: 0,
    left: 0,
  });



  const resizeHandler = () => {
    setSize(window.innerWidth);
    if(ref.current) {
      const rect = ref.current?.getBoundingClientRect()
      setCoord({top: rect.top + 80, left:rect.left + 90})
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    setTimeout(resizeHandler, 1000)
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className={styles.menu} ref={ref}>
      <MenuBtn onClick={() => setOpenDrop(!openDrop)} />
      <Dropdown rectes={coord} isOpen={openDrop}>
        <div className={styles.dropdown}>
          {(size !== undefined && size < 1024)
            ?
              <MenuItemList postId='1234' />
            :
              <DesktopMenuItemList postId='12345' />
          }
        </div>
      </Dropdown>
    </div>
  );
}
