import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {HomeService} from '../../service/home.service';
import {SingerService} from '../../service/singer.service';
import {Banner, HotTag, Singer, SongSheet} from '../../service/dataTypes/common-types';
import {forkJoin, Observable} from 'rxjs';
import {first} from 'rxjs/operators';
// call for service and get Banners, HotTag, SheetList AND EnterSinger data once and give back to home page
type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]];
@Injectable()
export class HomeResolveService implements Resolve<HomeDataType> {
  constructor(
    private homeService: HomeService,
    private singerService: SingerService, ) {}
  resolve(): Observable<HomeDataType>{
    return forkJoin([
      this.homeService.getBanners(),
      this.homeService.getHotTags(),
      this.homeService.getPersonalSheetList(),
      this.singerService.getEnterSinger()
    ]).pipe(first());

  }
}
