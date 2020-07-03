import {PlayState} from '../reducers/player.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
// this is the selector file of player

const selectPlayerStates = (state: PlayState) => state;

export const getPlaying = createSelector(selectPlayerStates, (state: PlayState) => state.playing);
export const getPlayList = createSelector(selectPlayerStates, (state: PlayState) => state.playList);
export const getSongList = createSelector(selectPlayerStates, (state: PlayState) => state.songList);
export const getPlayMode = createSelector(selectPlayerStates, (state: PlayState) => state.playMode);
export const getCurrentIndex = createSelector(selectPlayerStates, (state: PlayState) => state.currentIndex);
export const getCurrentSong = createSelector(selectPlayerStates, ({ playList, currentIndex}: PlayState) => playList[currentIndex]);
export const getPlayer = createFeatureSelector<PlayState>('player');
