
// this file defile defined functions that will be used in slider component
export function sliderEvent(e: Event) {
        e.stopPropagation();
        e.preventDefault();
      }
// get offset for checking if it is vertical or horizontal
export function getElementOffset(el: HTMLElement): {top: number; left: number; } {
  if (!el.getClientRects().length){
    return {
      top: 0,
      left: 0
    };
  }
  const rect = el.getBoundingClientRect();

  const win = el.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageXOffset,
    left: rect.left + win.pageXOffset,
  };
}

