import {Observable} from 'rxjs';
// this file defines different data types that will be used in slider component
export type WySliderStyle = {
  width?: string | null;
  height?: string | null;
  left?: string | null;
  bottom?: string | null;
};

export type SliderEventObserverConfig = {
  start: string;
  move: string;
  end: string;
  filter: (e: Event) => boolean;
  pluckKey: string[];
  startPlucked$?: Observable<number>;
  moveResolve$?: Observable<number>;
  end$?: Observable<Event>;
};

export type SliderValue = number | null;
