import {ReplaySubject} from 'rxjs/ReplaySubject';

export const NgDestroy = () => (targetPrototype: any, propertyKey: string) => {

  const destroyedSubject = new ReplaySubject<void>(1);
  const destroyed$ = destroyedSubject.asObservable();

  if (delete this[propertyKey]) {
    Object.defineProperty(targetPrototype, propertyKey, {
      configurable: true,
      enumerable: true,
      value: destroyed$,
    });
  }

  const originalNgOnDestroy = targetPrototype.ngOnDestroy;

  targetPrototype.ngOnDestroy = function(...args: any[]) {
    destroyedSubject.next(void 0);
    destroyedSubject.complete();

    if (originalNgOnDestroy) {
      return originalNgOnDestroy.apply(this, args);
    }
  };
};
