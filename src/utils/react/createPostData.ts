import { IPostData } from "../../shared/store/posts/actions"

interface IPostContextData {
  id?: string
  author?: string
  title?: string
  rating?: string
  commentsCount?: string
  avatar?: string
  previewImg?: string | undefined
  datePostUtc?: string
  commentHref?: string
}

export function createPostData (data: Array<any>) {
  return data.map(item => {
    const el:IPostContextData = {};
    el.id = item.data.id;
    el.author = item.data.author;
    el.title = item.data.title;
    el.rating = item.data.ups;
    el.commentsCount = item.data.num_comments;
    el.avatar = (item.data.sr_detail.icon_img) ? item.data.sr_detail.icon_img : 'https://mir-avatarok.3dn.ru/_si/0/03342719.jpg';
    el.previewImg = (item.data.preview) ? item.data.preview.images?.[0].source.url.replace(/(\&amp\;)/g, '&') : 'https://st.depositphotos.com/1000122/2016/i/450/depositphotos_20163697-stock-photo-small-scottish-straight-kitten-walking.jpg';
    el.datePostUtc = item.data.created_utc;
    el.commentHref = item.data.permalink;
    return el;
  })
}
