import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from './service.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SheetList, Song, SongSheet} from './dataTypes/common-types';
import {map, pluck, switchMap} from 'rxjs/operators';
import {SongService} from './song.service';
import queryString from 'query-string';
// this file is getting data from apis
export type SheetParams = {
  offset: number;
  limit: number;
  order: 'new' | 'hot';
  cat: string;
};
@Injectable({
  providedIn: ServiceModule
})
export class SheetService {

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private url: string,
    private songService: SongService,
  ) { }
  getSheets(args: SheetParams): Observable<SheetList>{
     const params = new HttpParams({fromString: queryString.stringify(args)});
     return this.http.get(this.url + 'top/playlist', { params }).pipe(map(res => res as SheetList));
  }
  getSongSheetDetail(id: number): Observable<SongSheet> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.url + 'playlist/detail', {params}).pipe(map((res: {playlist: SongSheet}) => res.playlist));
  }
  playSheet(id: number): Observable<Song[]>{
    return this.getSongSheetDetail(id).pipe(pluck('tracks'), switchMap(tracks => this.songService.getSongList(tracks)));
  }
}
