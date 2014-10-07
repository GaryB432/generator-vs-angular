/// <reference path="../../typings/tsd.d.ts" />

angular.module("app",
    [
        "ngRoute",
        "app.services",
        "app.controllers",
        "app.directives"
    ]).config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider): void => {
        $routeProvider
            .when("/", { templateUrl: "templates/states/main.html", controller: "FunCtrl" })
            .when("/about", { templateUrl: "templates/states/about.html" })
            .otherwise({ redirectTo: "/" });
    }]);