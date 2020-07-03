import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SheetListComponent} from './sheet-list.component';

// this file defines the url for general sheet page
const routes: Routes = [{
  path: 'sheet', component: SheetListComponent, data: { title: 'Song List' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SheetListRoutingModule { }
