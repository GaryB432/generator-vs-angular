module Directives {

    export interface IPaneScope extends ng.IScope {
        selected: boolean;
    }

    export interface ITabsScope extends ng.IScope {
        panes: IPaneScope[];
        select(pane: IPaneScope): void;
    }

    class TabsCtrl {
        panes: IPaneScope[];
        constructor(private $scope: ITabsScope) {
            this.panes = $scope.panes = [];

            $scope.select = (pane: IPaneScope) => {
                angular.forEach(this.panes, p => {
                    p.selected = false;
                });
                pane.selected = true;
            };

        }
        addPane(pane: IPaneScope) {
            if (this.panes.length === 0) {
                this.$scope.select(pane);
            }
            this.panes.push(pane);
        }
    }

    export class Factory {

        static TabsDirective(): ng.IDirective {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                controller: TabsCtrl,
                templateUrl: 'templates/directives/tabs.html'
            };
        }

        static PaneDiretive(): ng.IDirective {
            return {
                require: '^myTabs',
                restrict: 'E',
                transclude: true,
                scope: {
                    title: '@'
                },
                link: (scope, element, attrs, tabsCtrl) => {
                    tabsCtrl.addPane(scope);
                },
                templateUrl: 'templates/directives/pane.html'
            };
        }

    }

}

angular.module("app.directives", [])
    .directive('myTabs', Directives.Factory.TabsDirective)
    .directive('myPane', Directives.Factory.PaneDiretive);
