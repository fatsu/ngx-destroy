import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {NgxDestroy} from './decorator';

describe('@NgxDestroy', () => {

  let testClass: any;

  class TestClass {
    @NgxDestroy() a$: Observable<void>;
  }

  beforeEach(() => {
    testClass = new TestClass();
  });

  it('should override getter accessor for decorated property', () => {
    expect(testClass.a$).toBeDefined();
  });

  it('should override setter accessor for decorated property', () => {
    expect(() => {
      testClass.a$ = Observable.of('something')
    }).toThrow();
  });

  it('should add ngOnDestroy function if not present', () => {
    expect(testClass.ngOnDestroy).toEqual(jasmine.any(Function));
  });

  it('should trigger and complete a$ when ngOnDestroy is called', () => {
    let count = 0;
    let complete = false;

    testClass.a$.subscribe({
      next: (value: any) => {
        count++;
      },
      complete: () => {
        complete = true;
      },
    });

    testClass.ngOnDestroy();

    expect(count).toEqual(1, 'observable a$ should have been triggered');
    expect(complete).toEqual(true, 'observable a$ should have completed');
  });

  it('should wrap around existing ngOnDestroy function', () => {

    class TestClass2 {
      @NgxDestroy() b$: Observable<void>;

      public ngOnDestroyCalled: boolean = false;

      public ngOnDestroy(): void {
        this.ngOnDestroyCalled = true;
      }
    }

    let count = 0;
    let complete = false;

    testClass = new TestClass2();

    testClass.b$.subscribe({
      next: (value: any) => {
        count++;
      },
      complete: () => {
        complete = true;
      },
    });

    testClass.ngOnDestroy();

    expect(count).toEqual(1, 'observable b$ should have been triggered');
    expect(complete).toEqual(true, 'observable b$ should have completed');
    expect(testClass.ngOnDestroyCalled).toEqual(true, 'original ngOnDestroy should have been called');
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
      next: (value: any) => {
        t1.count++;
      },
      complete: () => {
        t1.complete = true;
      },
    });

    testClass2.a$.subscribe({
      next: (value: any) => {
        t2.count++;
      },
      complete: () => {
        t2.complete = true;
      },
    });

    testClass.ngOnDestroy();

    expect(t1.count).toEqual(1, 'observable testClass.a$ should have been triggered');
    expect(t1.complete).toEqual(true, 'observable testClass.a$ should have completed');

    expect(t2.count).toEqual(0, 'observable testClass2.a$ should NOT have been triggered');
    expect(t2.complete).toEqual(false, 'observable testClass2.a$ should NOT have completed');

    testClass2.ngOnDestroy();
    expect(t2.count).toEqual(1, 'observable testClass2.a$ should have been triggered');
    expect(t2.complete).toEqual(true, 'observable testClass2.a$ should have completed');
  });
});
