[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Using this module in other modules

## Purpose

Create an observable that will get triggered when ngOnDestroy is called on the angular 2 component, without having to implement OnDestroy and/or duplicate the same logic over and over.

The takeUntil operator can be used to complete the explicit subscriptions when the component is destroyed. No more need to manually unsubscribe in ngOnDestroy(), or handle a destroy-Subject 

## Install module

`$ npm install ngx-destroy --save`

## Usage

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
## Example

[ngx-destroy-example](https://github.com/fatsu/ngx-destroy-example)

## Further reading/watching:

[Ben Lesh - Don't unsubscribe](https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87)

[André Staltz - Use takeUntil instead of manually unsubscribing](https://egghead.io/lessons/rxjs-use-takeuntil-instead-of-manually-unsubscribing-from-observables)

## Additional thoughts

It would probably more 'Angular' to work with a factory-provider so the destroyed$-observable gets injected... for a later version!   
