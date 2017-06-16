/**
 * Created by dariusstrasel on 6/15/17.
 */

angular.module("meanhotel").controller('HotelController', HotelController);

function HotelController(hotelDataFactory, $routeParams) {
    var vm = this;
    var id = $routeParams.id;
    hotelDataFactory.hotelDisplay(id).then(function (response) {
        vm.hotel = response;
    })
}