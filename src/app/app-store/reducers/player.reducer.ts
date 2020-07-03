import {PlayMode} from '../../share/music-ui/music-player/player-types';
import {Song} from '../../service/dataTypes/common-types';
import {Action, createReducer, on} from '@ngrx/store';
import {SetCurrentIndex, SetPlaying, SetPlayList, SetPlayMode, SetSongList} from '../actions/player.action';

import {state} from '@angular/animations';
// data type which player needs
export type PlayState = {
  playing: boolean;
  playMode: PlayMode;
  songList: Song[];
  playList: Song[];
  currentIndex: number;
};
// initialize state
export const initialState: PlayState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: {type: 'loop', label: 'loop'},
  currentIndex: -1
};
// register player actions
const reducer = createReducer(
   initialState,
   on(SetPlaying, (state, { playing }) => ({ ...state, playing })),
  on(SetPlayList, (state, { playList }) => ({ ...state,  playList })),
  on(SetSongList, (state, { songList }) => ({ ...state,  songList })),
  on(SetPlayMode, (state, { playMode }) => ({ ...state,  playMode })),
  on(SetCurrentIndex, (state, { currentIndex }) => ({ ...state,  currentIndex }))
   );

export function playerReducer(state: PlayState, action: Action){
  return reducer(state, action);
}


