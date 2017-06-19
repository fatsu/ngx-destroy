import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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
