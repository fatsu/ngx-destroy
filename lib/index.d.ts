import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export declare const NgDestroy: () => (targetPrototype: any, propertyKey: string) => void;
export declare const NgxDestroy: () => (targetPrototype: any, propertyKey: string) => void;
export declare class NgxDestroy$ extends Observable<boolean> implements OnDestroy {
    private subject;
    constructor();
    ngOnDestroy(): void;
}
