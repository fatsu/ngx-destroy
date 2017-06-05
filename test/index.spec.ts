import {assert} from 'chai';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {NgDestroy} from '../src/index';

describe('NgDestroy', () => {

  let testClass;

  class TestClass {
    @NgDestroy() a$: Observable<void>;
  }

  beforeEach(() => {
    testClass = new TestClass();
  });

  it('should override getter accessor for decorated property', () => {
    assert.isDefined(testClass.a$);
  });

  it('should override setter accessor for decorated property', () => {

    assert.throws(() => {
      testClass.a$ = Observable.of('something');
    });
  });

  it('should add ngOnDestroy function if not present', () => {
    assert.isFunction(testClass.ngOnDestroy);
  });

  it('should trigger and complete a$ when ngOnDestroy is called', () => {
    let count = 0;
    let complete = false;

    testClass.a$.subscribe({
      next: (value) => {
        count++;
      },
      complete: () => {
        complete = true;
      },
    });

    testClass.ngOnDestroy();

    assert.equal(count, 1, 'observable a$ should have been triggered');
    assert.isTrue(complete, 'observable a$ should have completed');
  });

  it('should wrap around existing ngOnDestroy function', () => {

    class TestClass2 {
      @NgDestroy() b$;

      public ngOnDestroyCalled: boolean = false;

      public ngOnDestroy(): void {
        this.ngOnDestroyCalled = true;
      }
    }

    let count = 0;
    let complete = false;

    testClass = new TestClass2();

    testClass.b$.subscribe({
      next: (value) => {
        count++;
      },
      complete: () => {
        complete = true;
      },
    });

    testClass.ngOnDestroy();

    assert.equal(count, 1, 'observable b$ should have been triggered');
    assert.isTrue(complete, 'observable b$ should have completed');
    assert.isTrue(testClass.ngOnDestroyCalled, 'original ngOnDestroy should have been called');
  });
});
