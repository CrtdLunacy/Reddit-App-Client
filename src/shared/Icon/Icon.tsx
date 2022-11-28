import React from 'react';
import styles from './icon.css';
// import classNames from 'classnames';
import MenuIcon from '../Icons/MenuIcon';
import BlockIcon from '../Icons/BlockIcon';
import WarnIcon from '../Icons/WarnIcon';
import ShareIcon from '../Icons/ShareIcon';
import SaveIcon from '../Icons/SaveIcon';
import CommentIcon from '../Icons/CommentIcon';
import DeskShareIcon from '../Icons/DeskShareIcon';
import DeskSaveIcon from '../Icons/DeskSaveIcon';
import AnonymIcon from '../Icons/AnonymIcon';
import ArrowsIcon from '../Icons/ArrowsIcon';
import ImagesIcon from '../Icons/ImagesIcon';
import FilesIcon from '../Icons/FilesIcon';
import DownloadIcon from '../Icons/DownloadIcon';
import ContactIcon from '../Icons/ContactIcon';
import ReloadIcon from '../Icons/ReloadIcon';
import LinkIcon from '../Icons/LinkIcon';
import RecordIcon from '../Icons/RecordIcon';
import ChatIcon from '../Icons/ChatIcon';
import DrawIcon from '../Icons/DrawIcon';
import WordsIcon from '../Icons/WordsIcon';
import PdfIcon from '../Icons/PdfIcon';

export enum EIcons {
  block = 'BlockIcon',
  menu = 'MenuIcon',
  warn = 'WarnIcon',
  share = 'ShareIcon',
  save = 'SaveIcon',
  comment = 'CommentIcon',
  dshare = 'DeskShareIcon',
  dsave = 'DeskSaveIcon',
  anon = 'AnonymIcon',
  arrow = 'ArrowsIcon',
  image = 'ImagesIcon',
  files = 'FilesIcon',
  download = 'DownloadIcon',
  contact = 'ContactIcon',
  reload = 'ReloadIcon',
  link = 'LinkIcon',
  record = 'RecordIcon',
  chat = 'ChatIcon',
  draw = 'DrawIcon',
  words = 'WordsIcon',
  pdf = 'PdfIcon'
}

type TSizes = 28 | 20 | 16 | 14 | 12 | 10;

interface IIconProps {
  name: EIcons;
  size?: TSizes;
}

function getComponent(name: EIcons) {
  switch(name){
    case EIcons.menu: return <MenuIcon />
    case EIcons.block: return <BlockIcon />
    case EIcons.warn: return <WarnIcon />
    case EIcons.share: return <ShareIcon />
    case EIcons.save: return <SaveIcon />
    case EIcons.comment: return <CommentIcon />
    case EIcons.dshare: return <DeskShareIcon />
    case EIcons.dsave: return <DeskSaveIcon />
    case EIcons.anon: return <AnonymIcon />
    case EIcons.arrow: return <ArrowsIcon />
    case EIcons.image: return <ImagesIcon />
    case EIcons.files: return <FilesIcon />
    case EIcons.download: return <DownloadIcon />
    case EIcons.contact: return <ContactIcon />
    case EIcons.reload: return <ReloadIcon />
    case EIcons.link: return <LinkIcon />
    case EIcons.record: return <RecordIcon />
    case EIcons.chat: return <ChatIcon />
    case EIcons.draw: return <DrawIcon />
    case EIcons.words: return <WordsIcon />
    case EIcons.pdf: return <PdfIcon />
  }
}



export function Icon({ name, size }: IIconProps) {
  return (
  <span className={styles.icon}>{getComponent(name)}</span>
  );
}
