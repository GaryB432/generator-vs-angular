module Controllers {

    export interface ITodoScope extends ng.IScope {
        add(a: number, b: number): void;
        sum: number;
    }

    export class FunCtrl {
        constructor($scop: ITodoScope, mathService: MathService) {

            $scop.add = (a: number, b: number): void => {
                $scop.sum = mathService.add(a, b);
            };
        }
    }

}
angular.module("app.controllers", ["app.services"])
    .controller("FunCtrl", ["$scope", "MathService", Controllers.FunCtrl]);