"use strict";
var _this = this;
exports.__esModule = true;
var ReplaySubject_1 = require("rxjs/ReplaySubject");
exports.NgDestroy = function () { return function (targetPrototype, propertyKey) {
    var destroyedSubject = new ReplaySubject_1.ReplaySubject(1);
    var destroyed$ = destroyedSubject.asObservable();
    if (delete _this[propertyKey]) {
        Object.defineProperty(targetPrototype, propertyKey, {
            configurable: true,
            enumerable: true,
            value: destroyed$
        });
    }
    var originalNgOnDestroy = targetPrototype.ngOnDestroy;
    targetPrototype.ngOnDestroy = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        destroyedSubject.next(void 0);
        destroyedSubject.complete();
        if (originalNgOnDestroy) {
            return originalNgOnDestroy.apply(this, args);
        }
    };
}; };
