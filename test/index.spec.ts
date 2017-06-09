import {assert} from 'chai';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {NgDestroy} from '../src/index';

describe('NgDestroy', () => {

  let testClass: any;

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

  it('should trigger and complete a$ when ngOnDestroy is called without affecting similar components', () => {

    const testClass2: any = new TestClass();

    let t1 = {
        count: 0,
        complete: false,
      },
      t2 = {
        count: 0,
        complete: false,
      };

    testClass.a$.subscribe({
      next: (value) => {
        t1.count++;
      },
      complete: () => {
        t1.complete = true;
      },
    });

    testClass2.a$.subscribe({
      next: (value) => {
        t2.count++;
      },
      complete: () => {
        t2.complete = true;
      },
    });

    testClass.ngOnDestroy();

    assert.equal(t1.count, 1, 'observable testClass.a$ should have been triggered');
    assert.isTrue(t1.complete, 'observable testClass.a$ should have completed');

    assert.equal(t2.count, 0, 'observable testClass2.a$ should NOT have been triggered');
    assert.isFalse(t2.complete, 'observable testClass2.a$ should NOT have completed');

    testClass2.ngOnDestroy();
    assert.equal(t2.count, 1, 'observable testClass2.a$ should have been triggered');
    assert.isTrue(t2.complete, 'observable testClass2.a$ should have completed');
  });
});
