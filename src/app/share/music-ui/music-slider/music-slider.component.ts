import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, forwardRef, Inject,
  Input, OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {fromEvent, merge, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, pluck, takeUntil, tap} from 'rxjs/operators';
import {SliderEventObserverConfig, SliderValue} from '../music-slider-track/music-slider-types';
import {DOCUMENT} from '@angular/common';
import {getElementOffset, sliderEvent} from '../music-slider-track/music-slider-helpler';
import {inArray} from '../../../Utils/array';
import {getPercent, limitNumberInRange} from '../../../Utils/number';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';



@Component({
  selector: 'app-music-slider',
  templateUrl: './music-slider.component.html',
  styleUrls: ['./music-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MusicSliderComponent),
    multi: true
  }]
})
export class MusicSliderComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() wyVertical = false;
  @Input() wyMin = 0;
  @Input() wyMax = 100;
  @Input() bufferOffset: SliderValue = 0;


  private sliderDom: HTMLDivElement;
  @ViewChild('wySlider', { static: true}) private wySlider: ElementRef;
  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;
  private dragStart1: Subscription | null;
  private dragMove1: Subscription | null;
  private dragEnd1: Subscription | null;
  private isDragging = false;
  value: SliderValue = null;
  offset: SliderValue = null;

  constructor(@Inject(DOCUMENT) private doc: Document, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
    this.subscribeDrag(['start']);
  }
  private createDraggingObservables() {
    const orientField = this.wyVertical ? 'pageY' : 'pageX';
    // mouse action
    const mouse: SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField]
    };
    // touch action for mobile devices
    const touch: SliderEventObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filter: (e: TouchEvent) => e instanceof TouchEvent,
      pluckKey: ['touches', '0', orientField]
    };
    [mouse, touch].forEach(source => {
      const { start, move, end, filter: filterFunc, pluckKey } = source;
      source.startPlucked$ = fromEvent(this.sliderDom, start).pipe(
        filter(filterFunc),
        tap(sliderEvent),
        pluck(...pluckKey),
        map((position: number) => this.findClosesValue(position))
      );
      source.end$ = fromEvent(this.doc, end);
      source.moveResolve$ = fromEvent(this.doc, move).pipe(
        filter(filterFunc),
        tap(sliderEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position: number) => this.findClosesValue(position)),
        takeUntil(source.end$)
      );
    });

    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.moveResolve$, touch.moveResolve$);
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }
  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart$ && !this.dragStart1) {
      this.dragStart1 = this.dragStart$.subscribe(this.onDragStart.bind(this));
    }
    if (inArray(events, 'move') && this.dragMove$ && !this.dragMove1) {
      this.dragMove1 = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if (inArray(events, 'end') && this.dragEnd$ && !this.dragEnd1) {
      this.dragEnd1 = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private unsubscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart1) {
      this.dragStart1.unsubscribe();
      this.dragStart1 = null;
    }
    if (inArray(events, 'move') && this.dragMove1) {
      this.dragMove1.unsubscribe();
      this.dragMove1 = null;
    }
    if (inArray(events, 'end') && this.dragEnd1) {
      this.dragEnd1.unsubscribe();
      this.dragEnd1 = null;
    }
  }
  // when the drag is at the strart then it is movable
  private onDragStart(value: number) {
     this.toggleDragMoving(true);
     this.setValue(value);
  }
  private onDragMove(value: number) {
     if (this.isDragging) {
       this.setValue(value);
       this.cdr.markForCheck();
     }
  }
  // when the drag go to the end then stop dragging
  private onDragEnd() {
     this.toggleDragMoving(false);
     this.cdr.markForCheck();
  }

  private setValue(value: SliderValue, needCheck = false) {
    if (needCheck){
      if (this.isDragging) { return; }
      this.value = this.formatValue(value);
    }else if (!this.valuesEqual(this.value, value)) {
      this.value = value;
      this.updateTrackHandles();
      this.onValueChange(value);
    }

  }
  private formatValue(value: SliderValue): SliderValue{
    let res = value;
    if (this.assertValueValid(value)){
       res = this.wyMin;
    }else {
      res = limitNumberInRange(value, this.wyMin, this.wyMax);
    }
    return res;
  }
  // check if it is NAN
  private assertValueValid(value: SliderValue): boolean{
    return isNaN(typeof value !== 'number' ? parseFloat(value) : value);
  }

  private valuesEqual(valA, valB: SliderValue): boolean {
    if (typeof valA !== typeof valB){
      return false;
    }
    return valA === valB;
  }
   // change attribute offset
  private updateTrackHandles() {
    this.offset = this.getValueToOffset(this.value);
    this.cdr.markForCheck();
  }
// transfer value to offset
  private getValueToOffset(value: SliderValue): SliderValue{
    return getPercent(this.wyMin, this.wyMax, value);
  }

  private toggleDragMoving(movable: boolean) {
    this.isDragging = movable;
    if (movable) {
      this.subscribeDrag(['move', 'end']);
    }else {
     this.unsubscribeDrag(['move', 'end']);
    }
  }



  private findClosesValue(position: number): number{
    const sliderLength = this.getSliderLength();
    const sliderStart = this.getSliderStartPosition();
    const ratio = limitNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const ratioTrue = this.wyVertical ? 1 - ratio : ratio;

    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin;
  }
  private getSliderLength(): number {
    return this.wyVertical ? this.sliderDom.clientHeight : this.sliderDom.clientWidth;
  }
  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.wyVertical ? offset.top : offset.left;
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
  }
  private onValueChange(value: SliderValue): void{}
  private onTouched(): void{}

  writeValue(value: SliderValue): void {
    this.setValue(value, true);
  }

  registerOnChange(fn: (value: SliderValue) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
