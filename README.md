[![Build Status](https://travis-ci.org/fatsu/ngx-destroy.svg?branch=master)](https://travis-ci.org/fatsu/ngx-destroy)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# ngx-destroy

## Purpose

Remove the overhead of manually managing explicit infinite RxJS subscriptions over-and-over by providing and injecting an observable that will get triggered when Angular calls the OnDestroy life-cycle hook.   
   
The takeUntil operator can be used in combination with this observable to complete explicit subscriptions without having to unsubscribe or handle a destroy-Subject in ngOnDestroy(). 

## Install

`$ npm install ngx-destroy --save`

## Usage

Add NgxDestroy$ as a provider on Component level, and inject it where needed.
      
When the component context is destroyed, Angular will call the OnDestroy hook on the providers and our observable will be triggered.

The initial version of this lib used a decorator to configure the destroyed$ observable (see demo BbbComponent). This is still supported, but not the prefered way.  

## Example

```typescript
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

```

## Further reading/watching:

[Ben Lesh - Don't unsubscribe](https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87)

[André Staltz - Use takeUntil instead of manually unsubscribing](https://egghead.io/lessons/rxjs-use-takeuntil-instead-of-manually-unsubscribing-from-observables)
