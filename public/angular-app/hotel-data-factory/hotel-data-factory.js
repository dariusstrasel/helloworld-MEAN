/**
 * Created by dariusstrasel on 6/15/17.
 */
angular.module('meanhotel').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http) {

    return {
        hotelList: hotelList,
        hotelDisplay: hotelDisplay
    };

    function hotelList() {
        console.log("DTAADSDD");
        return $http.get('/api/hotels?count=10').then(complete).catch(failed);
    }

    function hotelDisplay(id) {
        return $http.get('/api/hotels/' + id).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data
    }

    function failed(error) {
        console.log(error.statusText);
    }
}