/**
 * Created by dariusstrasel on 6/15/17.
 */

angular.module("meanNasdaq").controller('TickerSymbolController', TickerSymbolController);

function TickerSymbolController( $route, $routeParams, $window, tickerSymbolDataFactory, AuthFactory, jwtHelper) {
    var vm = this;
    var symbol = $routeParams.tickerSymbol;
    vm.isSubmitted = false;
    tickerSymbolDataFactory.tickerSymbolDisplay(symbol).then(function (response) {
        vm.tickerSymbol = response;
        console.log(vm.tickerSymbol);
    });


    vm.isLoggedIn = function () {
        return AuthFactory.isLoggedIn;
    };
}