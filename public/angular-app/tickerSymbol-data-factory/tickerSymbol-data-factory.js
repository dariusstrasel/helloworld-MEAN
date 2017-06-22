/**
 * Created by dariusstrasel on 6/15/17.
 */
angular.module('meanNasdaq').factory('tickerSymbolDataFactory', tickerSymbolDataFactory);

function tickerSymbolDataFactory($http) {

    return {
        tickerSymbolList: tickerSymbolList,
        tickerSymbolDisplay: tickerSymbolDisplay
    };

    function tickerSymbolList() {
        return $http.get('/api/tickerSymbols?count=10')
            .then(complete)
            .catch(failed);
    }

    function tickerSymbolDisplay(symbol) {
        return $http.get('/api/tickerSymbols/' + symbol)
            .then(complete)
            .catch(failed);
    }

  // function postReview(id, review) {
  //   return $http.post('/api/hotels/' + id + '/reviews', review).then(complete).catch(failed);
  // }
    
    function complete(response) {
        return response.data
    }

    function failed(error) {
        console.log(error.statusText);
    }
}