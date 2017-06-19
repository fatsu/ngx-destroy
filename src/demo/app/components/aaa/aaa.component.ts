import {Component, OnInit} from '@angular/core';
import {NgxDestroy$} from 'ngx-destroy';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-aaa',
  templateUrl: './aaa.component.html',
  providers: [
    NgxDestroy$
  ]
})
export class AaaComponent implements OnInit {

  private clicks$: Observable<any>;

  constructor(private destroyed$: NgxDestroy$) {
    const mapMouseEvent = (e: MouseEvent) => ({x: e.x, y: e.y});

    this.clicks$ = Observable
      .fromEvent(document, 'click')
      .map(mapMouseEvent);
  }

  ngOnInit(): void {

    this.clicks$
      .takeUntil(this.destroyed$)
      .subscribe(x => console.log('AAA-with-take-until', x));

    this.clicks$
      .subscribe(x => console.log('AAA-WITHOUT -> MEMORY LEAK!', x));
  }

}
