import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SheetInfoComponent} from './sheet-info.component';
import {SheetInfoResolveService} from './sheet-info-resolve.service';

// this file defines url for specialized sheet information page
const routes: Routes = [{
  path: 'sheetInfo/:id', component: SheetInfoComponent, data: {title: 'Detail'}, resolve: { sheetInfo: SheetInfoResolveService}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SheetInfoResolveService]
})
export class SheetInfoRoutingModule { }
