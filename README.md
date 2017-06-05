[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Using this module in other modules

1. Install module:

`$ npm install ngx-destroy --save`

2. Usage

```typescript
@Component({
  selector: 'app-aaa',
  templateUrl: './aaa.component.html'
})
export class AaaComponent implements OnInit {

  @NgDestroy()
  private destroyed$: Observable<any>;

  ngOnInit(): void {

    const mapMouseEvent = (e: MouseEvent) => ({x: e.x, y: e.y});

    Observable
      .fromEvent(document, 'click')
      .map(mapMouseEvent)
      .takeUntil(this.destroyed$)
      .subscribe(doDebug('AaaComponent-with-take-until'));
  }

}
```
3. Example

https://github.com/fatsu/ngx-destroy-example
