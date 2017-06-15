"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _this = this;
exports.__esModule = true;
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
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
exports.NgxDestroy = exports.NgDestroy;
var NgxDestroy$ = (function (_super) {
    __extends(NgxDestroy$, _super);
    function NgxDestroy$() {
        var _this = _super.call(this) || this;
        _this.subject = new ReplaySubject_1.ReplaySubject(1);
        _this.source = _this.subject;
        return _this;
    }
    NgxDestroy$.prototype.ngOnDestroy = function () {
        this.subject.next(true);
        this.subject.complete();
    };
    return NgxDestroy$;
}(Observable_1.Observable));
NgxDestroy$ = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NgxDestroy$);
exports.NgxDestroy$ = NgxDestroy$;
