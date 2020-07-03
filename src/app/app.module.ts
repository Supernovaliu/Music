
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';



import { CoreModule } from './core/core.module';
import {CommonModule} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';




@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [

        CoreModule,
        CommonModule,


    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
