import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import {SheetListModule} from './sheet-list/sheet-list.module';
import {SheetInfoModule} from './sheet-info/sheet-info.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SheetListModule,
    HomeModule,
    SheetInfoModule
  ],
  exports: [
    SheetListModule,
   HomeModule,
    SheetInfoModule
  ]
})
export class PagesModule { }
