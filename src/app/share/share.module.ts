import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzInputModule } from 'ng-zorro-antd/input';
import {MusicUiModule} from './music-ui/music-ui.module';
import { FormatTimePipe } from './pipes/format-time.pipe';





@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    NzButtonModule,
    NzInputModule,
    MusicUiModule
  ],
  exports: [
    FormsModule,
    NgZorroAntdModule,
    NzButtonModule,
    NzInputModule,
    MusicUiModule,

  ]
})
export class ShareModule { }
