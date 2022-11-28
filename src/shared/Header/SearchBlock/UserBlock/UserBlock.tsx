import React from 'react';
import { EIcons, Icon } from '../../../Icon';
import { EColor, Text } from '../../../Text';
import styles from './userblock.css';

interface IUserBlockProps {
  avatarSrc?: string;
  username?: string;
  loading?: boolean;
}

export function UserBlock({ avatarSrc, username, loading }: IUserBlockProps) {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CURRENT_URL = process.env.CURRENT_URL;

  return (
    <a href={`https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${CURRENT_URL}&duration=permanent&scope=read submit identity`}
    className={styles.userBox}
    >
      <div className={styles.avatarBox}>
      {avatarSrc
        ? <img src={avatarSrc} alt='user avatar' className={styles.avatarImage} />
        : <Icon name={EIcons.anon} />
      }
      </div>

      <div className={styles.username}>
        {loading ? (
            <Text size={20} color={EColor.grey99}>Загрузка</Text>
        ) : (
          <Text size={20} color={username ? EColor.black : EColor.grey99}>{username || 'Аноним'}</Text>
        )}
      </div>
    </a>
  );
}
