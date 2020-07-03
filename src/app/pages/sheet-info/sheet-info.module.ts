import { NgModule } from '@angular/core';
import { SheetInfoRoutingModule } from './sheet-info-routing.module';
import { SheetInfoComponent } from './sheet-info.component';
import {ShareModule} from '../../share/share.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [SheetInfoComponent],
  imports: [
    ShareModule,
    SheetInfoRoutingModule,
    CommonModule
  ]
})
export class SheetInfoModule { }
