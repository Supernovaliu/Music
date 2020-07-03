import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WySliderStyle} from '../music-slider-track/music-slider-types';

@Component({
  selector: 'app-music-slider-handle',
  template: '<div class="wy-slider-handle" [ngStyle]="style"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicSliderHandleComponent implements OnInit, OnChanges {
  @Input() wyVertical = false;
  @Input() wyOffset: number;

  style: WySliderStyle = {};
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void{
    if (changes.wyOffSet) {
      this.style[this.wyVertical ? 'bottom' : 'left'] = this.wyOffset + '%';
    }
  }

}
