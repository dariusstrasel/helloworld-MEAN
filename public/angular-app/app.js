/**
 * Created by dariusstrasel on 6/15/17.
 */
angular.module('meanhotel', ['ngRoute'])
.config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsController,
            controllerAs: 'vm'
        });
}