import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceModule } from '../service/service.module';
import { PagesModule } from '../pages/pages.module';
import { ShareModule } from '../share/share.module';
import { registerLocaleData } from '@angular/common';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import {AppStoreModule} from '../app-store';

registerLocaleData(en);

// this file import core modules for the whole website
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,

    HttpClientModule,
    BrowserAnimationsModule,
    ServiceModule,
    PagesModule,
    ShareModule,
    AppStoreModule,
    AppRoutingModule,

  ],
  exports: [
    AppRoutingModule,
    ShareModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class CoreModule {

}
