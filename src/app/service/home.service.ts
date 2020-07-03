import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Banner, HotTag, SongSheet} from './dataTypes/common-types';
import { map } from 'rxjs/operators';


// @ts-ignore
@Injectable({
  providedIn: ServiceModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getBanners(): Observable<Banner[]>{
    // @ts-ignore
    return this.http.get(this.url + 'banner').pipe(map((res: {banners: Banner[]}) => res.banners));

  }
  // tslint:disable-next-line:align
  // @ts-ignore
  getHotTags(): Observable<HotTag[]> {
    return this.http.get(this.url + 'playlist/hot').pipe(map((res: {tags: HotTag[]}) => {
      return res.tags.sort((x: HotTag, y: HotTag) => {
        return x.position - y.position;
      }).slice(0, 5);
    }));
  }

 getPersonalSheetList(): Observable<SongSheet[]> {
    return this.http.get(this.url + 'personalized').pipe(map((res: {result: SongSheet[]}) => res.result.slice(0, 16)));
  }
}
