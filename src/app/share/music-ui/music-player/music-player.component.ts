import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppStoreModule} from '../../../app-store';
import {select, Store} from '@ngrx/store';
import {
  getCurrentIndex, getCurrentSong,
  getPlayer,
  getPlayList,
  getPlayMode,
  getSongList
} from '../../../app-store/selectors/player.selector';
import {Song} from '../../../service/dataTypes/common-types';
import {PlayMode} from './player-types';
import {SetCurrentIndex} from "../../../app-store/actions/player.action";

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less']
})
export class MusicPlayerComponent implements OnInit {
  sliderValue = 35;
  bufferOffset = 35;
  songList: Song[];
  playList: Song[];
  currentIndex: number;
  currentSong: Song;
  duration: number;
  currentTime: number;
  playing = false;
  songReady = false;

  @ViewChild('audio', {static: true}) private audio: ElementRef;
  private audioEl: HTMLAudioElement
  constructor(
    private store$: Store<AppStoreModule>
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => this.watchList(list, 'songList'));
    appStore$.pipe(select(getPlayList)).subscribe(list => this.watchList(list, 'playList'));
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => this.watchCurrentIndex(index));
    appStore$.pipe(select(getPlayMode)).subscribe(mode => this.watchPlayMode(mode));
    appStore$.pipe(select(getCurrentSong)).subscribe(song => this.watchCurrentSong(song));
  }
  private watchList(list: Song[], type: string){
    this[type] = list;
  }
  private watchCurrentIndex(index: number) {
    this.currentIndex = index;
  }
  private watchPlayMode(mode: PlayMode) {
    console.log(mode);
  }
  // watch current song state
  private watchCurrentSong(song: Song) {

    if (song){
      this.currentSong = song;
      this.duration = song.dt / 1000;
      console.log(song);
    }


  }
  ngOnInit() {
    this.audioEl = this.audio.nativeElement;
  }
  // play button
  onCanPlay() {
    this.songReady = true;
    this.play();
  }
  // play the song
  private play() {
    this.audioEl.play();
    this.playing = true;
  }
  // get single song cover picture
  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl : 'http://p3.music.126.net/Xl0WENt4F6wsgjjjQWuQsw==/109951164232034479.jpg';
  }
  // get song played current time
  onTimeUpdate(e: Event){
    this.currentTime = (e.target as HTMLAudioElement).currentTime;
  }
  // play/pause
  onToggle() {
    if (!this.currentSong){
      if (this.playList.length) {
        this.updateIndex(0);
      }
    }else {
      if (this.songReady){
      this.playing = !this.playing;
      if (this.playing) {
        this.audioEl.play();
      }else {
        this.audioEl.pause();
      }
    }
    }

  }
  // previous song button
  onPrev(index: number) {
    if (!this.songReady) {
      return;
    }
    if (this.playList.length === 1){
      this.loop();
    }else {
      const newIndex = index <= 0 ? this.playList.length - 1 : index;
      this.updateIndex(newIndex);
    }
  }
  // next song button
  onNext(index: number) {
    if (!this.songReady) {
      return;
    }
    if (this.playList.length === 1){
      this.loop();
    }else {
      const newIndex = index >= this.playList.length ? 0 : index;
      this.updateIndex(newIndex);
    }
  }
  // loop playing
  private loop(){
    this.audioEl.currentTime = 0;
    this.play();
  }
  // update index method
  private updateIndex(index: number) {
    this.store$.dispatch(SetCurrentIndex({currentIndex: index}));
    this.songReady = false;
  }
}
