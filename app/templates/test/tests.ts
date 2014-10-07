/// <reference path="../typings/tsd.d.ts" />
// thanks http://www.benlesh.com/2013/06/angular-js-unit-testing-services.html

describe('testing Math service', function () {
    var svc: MathService;

    beforeEach(function () {
        module('app.services');

        inject(function (_MathService_: MathService) {
            svc = _MathService_;
        });
    });

    it('should add properly.', function () {
        expect(svc.add(3, -1)).toEqual(2);
    });

});

