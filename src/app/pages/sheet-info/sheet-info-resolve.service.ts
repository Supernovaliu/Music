import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {SongSheet} from '../../service/dataTypes/common-types';
import {Observable} from 'rxjs';
import {SheetService} from '../../service/sheet.service';
// this file is calling for sheet detail and give to sheet information page
@Injectable()
export class SheetInfoResolveService implements Resolve<SongSheet>{
  constructor(private sheetService: SheetService) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<SongSheet> {
    return this.sheetService.getSongSheetDetail(Number(route.paramMap.get('id')));
  }
}
