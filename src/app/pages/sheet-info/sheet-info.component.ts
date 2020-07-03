import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {SongSheet} from '../../service/dataTypes/common-types';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit {
  sheetInfo: SongSheet;

  description = {
    short: '',
    long: ''
  }

  controlDesc = {
    isExpand: false,
    label: 'Expand',
    iconCls: 'down'
  }
  constructor(private route: ActivatedRoute) {
    this.route.data.pipe(map(res => res.sheetInfo)).subscribe(res => {
      this.sheetInfo = res;
      if (res.description) {
        this.changeDesc(res.description);
      }
    });
  }
// display the instruction part, when characters less than 99 then display all, otherwise display 99
  private changeDesc(desc: string) {
    if (desc.length < 99) {
      this.description.short = desc;
    }else {
      // const str = '<b>Introduction: </b>' + desc.replace(/\n/g, '<br />');
      this.description = {
        short: desc.slice(0, 99) + '...',
        long: desc
      };
    }
  }
  // a button that can expand and shrink the display area of introduction
  toggleDesc() {
    this.controlDesc.isExpand = !this.controlDesc.isExpand;
    if (this.controlDesc.isExpand) {
      this.controlDesc.label = 'Shrink';
      this.controlDesc.iconCls = 'up';
    }else {
      this.controlDesc.label = 'Expand';
      this.controlDesc.iconCls = 'down';
    }

  }

  ngOnInit(): void {
  }

}
