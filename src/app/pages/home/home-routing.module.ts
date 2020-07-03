import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import {HomeResolveService} from './home.resolve.service';

// this file defined a url for home page and get data from resolve
const routes: Routes = [
 {path: 'home', component: HomeComponent, data: {title: 'Finding'}, resolve: { homeDatas: HomeResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [HomeResolveService]
})
export class HomeRoutingModule { }
