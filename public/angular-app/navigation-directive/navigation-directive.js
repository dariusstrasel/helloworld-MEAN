/**
 * Created by dariusstrasel on 6/18/17.
 */
angular.module('meanhotel').directive('mhNavigation', mhNavigation);

function mhNavigation() {
    return {
        restrict: 'E',
        templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
    };
}