/**
 * Created by dariusstrasel on 6/15/17.
 */

angular.module('meanNasdaq').controller('TickerSymbolsController', TickerSymbolsController);

function TickerSymbolsController(tickerSymbolDataFactory) {
    var vm = this;
    vm.title = "MEAN NasDaq";
    tickerSymbolDataFactory.tickerSymbolList().then(function (response) {
        console.log(response);
        vm.tickerSymbols = response;
    })
}