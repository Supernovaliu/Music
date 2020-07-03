import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/share/share.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MusicCarouselComponent } from './components/music-carousel/music-carousel.component';
import { MemberCardComponent } from './components/member-card/member-card.component';

// this file imports modules that home component needs
@NgModule({
  declarations: [HomeComponent, MusicCarouselComponent, MemberCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule,
  ]
})
export class HomeModule { }
