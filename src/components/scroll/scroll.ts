import { Component, Input, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';

enum FRefreshState {
  Refreshing = 0,
  Releasing,
  Pulling,
  Pending
}

@Component({
  selector: 'f-scroll',
  templateUrl: 'scroll.html'
})
export class ScrollComponent {
  @ViewChild('scrollContainer') scrollContainerElement: ElementRef;
  @ViewChild('scroll') scrollElement: ElementRef;
  @ViewChild('box') boxElement: ElementRef;
  @ViewChild('content') contentElement: ElementRef;
  @ViewChild('icon') iconElement: ElementRef;
  
  @Input() enableRefresh?: boolean = false;
  
  @Output() onRefresh? = new EventEmitter();

  private timeout: number = 3000;
  private dist: number = 0;
  private distResisted: number = 0;
  private distThreshold: number = 60;
  private distMax: number = 80;
  private pullStartY: number = 0;
  private pullMoveY: number = 0;
  private cssProp: string = 'min-height';
  private text: string = "下拉刷新";
  private _state: FRefreshState = FRefreshState.Pending;

  set state(vState: FRefreshState) {
    this._state = vState;
    if (vState === FRefreshState.Pulling) {
      this.text = "下拉刷新";
    } else if (vState === FRefreshState.Releasing) {
      this.text = "释放加载"
    } else if (vState === FRefreshState.Refreshing) {
      this.text = "正在加载中...";
    } else {
      this.text = "下拉刷新";
    }
  }

  get state() {
    return this._state;
  }

  constructor(private ngZone: NgZone) {
  }

  done() {
    this.onReset();
  }

  onTouchStart(e) {
    if (!this.enableRefresh) {
      return;
    }

    this.pullStartY = e.touches[0].screenY;
    if (this.state !== FRefreshState.Pending) {
      return;
    }
    this.state = FRefreshState.Pending;
  }

  onTouchMove(e) {
    if (!this.enableRefresh) {
      return;
    }

    if (this.pullStartY > 0 ) {
      this.pullMoveY = e.touches[0].screenY;
    } else {
      this.pullStartY = e.touches[0].screenY;
    }

    if (this.state === FRefreshState.Refreshing) {
      return;
    }

    if (this.state === FRefreshState.Pending) {
      this.scrollElement.nativeElement.classList.add('pulling');
      this.state = FRefreshState.Pulling;
    }

    this.dist = this.pullMoveY - this.pullStartY;
    if (this.dist > 0) {
      this.scrollElement.nativeElement.style[this.cssProp] = `${this.distResisted}px`;
      this.distResisted = this.resistanceFunction(this.dist / this.distThreshold) * Math.min(this.distMax, this.dist);

      if (this.state === FRefreshState.Pulling && this.distResisted > this.distThreshold) {
        this.scrollElement.nativeElement.classList.add('releasing');
        this.state = FRefreshState.Releasing;
      }

      if (this.state === FRefreshState.Releasing && this.distResisted < this.distThreshold) {
        this.scrollElement.nativeElement.classList.remove('releaseing');
        this.state = FRefreshState.Pulling;

      }
    }
  }

  onTouchEnd(e) {
    if (!this.enableRefresh) {
      return;
    }

    if (this.state == FRefreshState.Releasing) {
      if (this.distResisted > this.distThreshold) {
        this.state = FRefreshState.Refreshing;
        this.scrollElement.nativeElement.style[this.cssProp] = `${this.distThreshold}px`;
        this.scrollElement.nativeElement.classList.remove('pulling');
        this.scrollElement.nativeElement.classList.remove('releasing');
        this.scrollElement.nativeElement.classList.add('refreshing');
        this.doRefresh();
      }
    } else if (this.state === FRefreshState.Refreshing){
      return;
    } else {
      this.onReset();
    }
  }

  doRefresh() {
    this.onRefresh.emit(this);
  }

  onReset() {
    this.pullStartY = 0;
    this.pullMoveY = 0;
    this.dist = 0;
    this.state = FRefreshState.Pending;
    this.scrollElement.nativeElement.classList.remove('refreshing')
    this.scrollElement.nativeElement.classList.remove('pulling');
    this.scrollElement.nativeElement.classList.remove('releasing');
    this.scrollElement.nativeElement.style[this.cssProp] = '0px';
  }

  cssPrefix(attr, value) {
    let str = [];
    str.push(attr + ':' + value);
    str.push('-webkit-' + attr + ':' + value);
    str.push('-moz-' + attr + ':' + value);
    str.push('-o-' + attr + ':' + value);
    str.push('-ms-' + attr + ':' + value);
    return str.join(';');
  }

  resistanceFunction(t) {
    this.ngZone.run(() => {
      let sc = (0.3 + 0.7 * Math.min(t, 2.5) / 2.5);
      let op = 1 * Math.min(t, 2.5) / 2.5;
      this.contentElement.nativeElement.setAttribute('style', this.cssPrefix('transform', 'scale(' + sc + ')') + this.cssPrefix('opacity', op));
    });
    return Math.min(1, t / 2.5);
  }

}

