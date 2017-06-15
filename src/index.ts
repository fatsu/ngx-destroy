import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';

export const NgDestroy = () => (targetPrototype: any, propertyKey: string) => {

  const propertyKeySubject = '__' + propertyKey + 'Subject';
  const propertyKeyObs = '__' + propertyKey;

  // lazy subject creation
  const subjectGetter = function() {
    if (!this[propertyKeySubject]) {
      this[propertyKeySubject] = new ReplaySubject<void>(1);
    }
    return this[propertyKeySubject];
  };

  // lazy subject.asObservable creation
  const observableGetter = function() {
    if (!this[propertyKeyObs]) {
      this[propertyKeyObs] = subjectGetter.apply(this).asObservable();
    }
    return this[propertyKeyObs];
  };

  // property re-definition
  if (delete this[propertyKey]) {
    Object.defineProperty(targetPrototype, propertyKey, {
      configurable: true,
      enumerable: true,
      get: observableGetter,
    });
  }

  // wrap ngOnDestroy
  const originalNgOnDestroy = targetPrototype.ngOnDestroy;
  targetPrototype.ngOnDestroy = function(...args: any[]) {
    const subject = subjectGetter.apply(this);

    subject.next(void 0);
    subject.complete();

    if (originalNgOnDestroy) {
      return originalNgOnDestroy.apply(this, args);
    }
  };
};

export const NgxDestroy = NgDestroy;

@Injectable()
export class NgxDestroy$ extends Observable<boolean> implements OnDestroy {

  private subject: Subject<boolean>;

  constructor() {
    super();
    this.subject = new ReplaySubject<boolean>(1);
    this.source = this.subject;
  }

  /**
   * take advantage of the fact that ngOnDestroy is called when a provider is destoyed!
   */
  public ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

}
