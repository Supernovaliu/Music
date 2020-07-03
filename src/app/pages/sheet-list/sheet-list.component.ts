import { Component, OnInit } from '@angular/core';
import {SheetParams, SheetService} from '../../service/sheet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SheetList} from '../../service/dataTypes/common-types';
// this file defines actions for sheet list page
@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.less']
})
export class SheetListComponent implements OnInit {
  listParams: SheetParams = {
    cat: '全部',
    order: 'hot',
    offset: 1,
    limit: 35
  }
  sheets: SheetList;
  orderValue = 'hot';
  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private router: Router,
  ) {
    this.listParams.cat = this.route.snapshot.queryParamMap.get('cat') || '全部';
    this.getList();
  }

  ngOnInit(): void {
  }
  private getList() {
    this.sheetService.getSheets(this.listParams).subscribe(sheets => this.sheets = sheets);
  }
  /*private onPlaySheet(id: number){
    console.log(id);
    this.sheetService.playSheet(id).subscribe(res => {
      console.log(res);
    });
  }*/
// when click new or hot button then jump to different pages
  onOrderChange(order: 'new' | 'hot') {
    this.listParams.order = order;
    this.listParams.offset = 1;
    this.getList();
  }
  // when click page number then jump to consistent page
  onPageChange(page: number) {
    this.listParams.offset = page;
    this.getList();
  }

  toInfo(id: number) {
    this.router.navigate(['/sheetInfo', id]);
  }

}
