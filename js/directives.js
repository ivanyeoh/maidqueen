angular.module('gear', [])
    .directive('selectableButton', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                options: '='
            },
            template: '<div class="btn-group btn-group-justified">\
                <div class="btn-group" ng-repeat="option in options">\
                    <button type="button" class="btn btn-default" ng-click="model=option">{{option}}</button>\
                </div>\
            </div>',
            link: function (scope) {
                scope.$watch('options', function () {
                    console.log(scope.options);
                }, true);
            }
        }
    });