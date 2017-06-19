import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {NgxDestroy$} from './service';
import {Subscription} from 'rxjs/Subscription';

describe('NgxDestroy$', () => {

  @Component({
    selector: 'test-component',
    template: '<div>Test Component</div>',
    providers: [
      NgxDestroy$
    ]
  })
  class TestComponent {
    constructor(public destroyed$: NgxDestroy$) {

    }
  }

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    return TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ]
    })
      .compileComponents();
  });

  it('should be triggered when component context is destroyed', () => {

    fixture = TestBed.createComponent(TestComponent);

    let nextCount = 0;
    let complete = false;

    const subscription: Subscription = fixture.componentInstance.destroyed$.subscribe(
      () => nextCount++,
      null,
      () => complete = true
    );

    expect(nextCount).toEqual(0);
    expect(complete).toEqual(false);

    fixture.destroy();

    expect(nextCount).toEqual(1);
    expect(complete).toEqual(true);

    subscription.unsubscribe();
  })
});
