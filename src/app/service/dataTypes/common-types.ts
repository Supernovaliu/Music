/* different data types that will be used in different pages*/
// Banner
export type Banner = {
 targetId: number;
 url: string;
 imageUrl: string;
};
// HotTag
export type HotTag = {
 id: number;
 name: string;
 position: number;
};
// SongSheet
export type SongSheet = {
  id: number;
  userId: number;
  name: string;
  picUrl: string;
  coverImgUrl: string;
  playCount: number;
  tags: string;
  createTime: number;
  creator: { nickname: string; avatarUrl: string; };
  description: string;
  subscribedCount: number;
  shareCount: number;
  commentCount: number;
  subscribed: boolean;
  tracks: Song[];
};
// Singer
export type Singer = {
  id: number;
	name: string;
	picUrl: string;
	albumSize: number;
};
// Song
export type Song = {
  id: number;
  name: string;
  url: string;
  ar: Singer[];
  al: {id: number; name: string; picUrl: string };
  dt: number;
};
// SongUrl
export type SongUrl = {
  id: number;
  url: string;
};
// SheetList
export type SheetList = {
  playlists: SongSheet[];
  total: number;
};
