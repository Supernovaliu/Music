import { Component, OnInit } from '@angular/core';
import {Banner, HotTag, Singer, SongSheet} from '../../service/dataTypes/common-types';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {SheetService} from '../../service/sheet.service';
import {AppStoreModule} from '../../app-store';
import {Store} from '@ngrx/store';
import {SetCurrentIndex, SetPlayList, SetSongList} from '../../app-store/actions/player.action';
// this is the basic component of home page
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  singers: Singer[];
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private store$: Store<AppStoreModule>,
  private sheetService: SheetService
  ) {
     this.route.data.pipe(map(res => res.homeDatas)).subscribe(([banners, hotTags, songSheetList, singers]) => {
       this.banners = banners;
       this.hotTags = hotTags;
       this.songSheetList = songSheetList;
       this.singers = singers;
     });
     // this.getBanners();
     // this.getHotTag();
     // this.getPersonalSheetList();
     // this.getEnterSinger();

   }


  ngOnInit(): void {
  }
  // this is an event bundled for playing song list
  onPlaySheet(id: number) {
    console.log(id);
    this.sheetService.playSheet(id).subscribe(list => {
      this.store$.dispatch(SetSongList({songList: list }));
      this.store$.dispatch(SetPlayList({playList: list }));
      this.store$.dispatch(SetCurrentIndex({currentIndex: 0 }));
    });
  }
// this function is for jump to sheel information page when click on single song list area
  toInfo(id: number) {
    this.router.navigate(['/sheetInfo', id]);
  }

}
