/**
 * Created by dariusstrasel on 6/15/17.
 */
angular.module('meanNasdaq').factory('tickerSymbolDataFactory', tickerSymbolDataFactory);

function tickerSymbolDataFactory($http) {

    return {
        tickerSymbolList: tickerSymbolList,
        tickerSymbolDisplay: tickerSymbolDisplay,
        tickerSymbolDisplay_live: tickerSymbolDisplay_live,
        tickerSymbolNews: tickerSymbolNews
    };

    function tickerSymbolList() {
        return $http.get('/api/tickerSymbols?count=10')
            .then(complete)
            .catch(failed);
    }

    function tickerSymbolDisplay_live(symbol) {
        return $http.get(`https://finance.google.com/finance/info?client=ig&q=NASDAQ:${symbol}`)
            .then(liveData)
            .catch(failed);
    }

    function tickerSymbolNews(symbol) {
        return $http.get(`http://webhose.io/filterWebContent?token=0db9b041-7e05-428f-8d8d-2e4c27ff19e5&format=json&ts=1498087100710&sort=crawled&q=a${symbol}`)
            .then(liveData)
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



    function processGoogleFinance(googleResponse) {
        console.log("response: ", googleResponse);
        stockData = JSON.parse(googleResponse.data.slice(3, googleResponse.data.length))[0];
        console.log(stockData);
        var stockDataReKeyed = function() {
            return {
                change: stockData['c'],
                index: stockData['e'],
                lastTradePrice: stockData['l'],
                lastTradeDateTime: stockData['lt_dts'],
                dividend: stockData['div'],
                yield: stockData['yld'],
                lastTradeSize: stockData['s'],
                previousClosePrice: stockData['pcls_fix']
            }
        };
        console.log("processed: ", stockDataReKeyed());
        return stockDataReKeyed();
    }

    function liveData(response) {
        return processGoogleFinance(response)
    }

    function complete(response) {
        return response.data
    }

    function failed(error) {
        console.log(error.statusText);
    }
}