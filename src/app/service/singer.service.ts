import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Singer } from './dataTypes/common-types';
import queryString from 'query-string';

type SingerParams = {
  offset: number;
  limit: number;
  cat?: string;
};
const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
}
// @ts-ignore
@Injectable({
  providedIn: ServiceModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]>{
    // @ts-ignore
    const params = new HttpParams({ formString: queryString.stringify(args) });
    return this.http.get(this.url + 'artist/list', {params}).pipe(map((res: {artists: Singer[]}) => res.artists));

  }

}

