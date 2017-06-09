"use strict";
var _this = this;
exports.__esModule = true;
var ReplaySubject_1 = require("rxjs/ReplaySubject");
exports.NgDestroy = function () { return function (targetPrototype, propertyKey) {
    var propertyKeySubject = '__' + propertyKey + 'Subject';
    var propertyKeyObs = '__' + propertyKey;
    var subjectGetter = function () {
        if (!this[propertyKeySubject]) {
            this[propertyKeySubject] = new ReplaySubject_1.ReplaySubject(1);
        }
        return this[propertyKeySubject];
    };
    var observableGetter = function () {
        if (!this[propertyKeyObs]) {
            this[propertyKeyObs] = subjectGetter.apply(this).asObservable();
        }
        return this[propertyKeyObs];
    };
    if (delete _this[propertyKey]) {
        Object.defineProperty(targetPrototype, propertyKey, {
            configurable: true,
            enumerable: true,
            get: observableGetter
        });
    }
    var originalNgOnDestroy = targetPrototype.ngOnDestroy;
    targetPrototype.ngOnDestroy = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subject = subjectGetter.apply(this);
        subject.next(void 0);
        subject.complete();
        if (originalNgOnDestroy) {
            return originalNgOnDestroy.apply(this, args);
        }
    };
}; };
