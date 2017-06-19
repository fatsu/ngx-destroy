import {Component, OnInit} from '@angular/core';
import {NgxDestroy} from 'ngx-destroy';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-bbb',
  templateUrl: './bbb.component.html'
})
export class BbbComponent implements OnInit {

  @NgxDestroy()
  private destroyed$: Observable<void>;

  private clicks$: Observable<any>;

  constructor() {
    const mapMouseEvent = (e: MouseEvent) => ({x: e.x, y: e.y});

    this.clicks$ = Observable
      .fromEvent(document, 'click')
      .map(mapMouseEvent);
  }

  ngOnInit(): void {

    this.clicks$
      .takeUntil(this.destroyed$)
      .subscribe(x => console.log('BBB-with-take-until', x));
  }
}
