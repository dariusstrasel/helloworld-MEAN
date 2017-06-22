/**
 * Created by dariusstrasel on 6/15/17.
 */

angular.module('meanNasdaq').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    var vm = this;
    vm.title = "MEAN Hotel App";
    hotelDataFactory.hotelList().then(function (response) {
        console.log(response);
        vm.hotels = response;
    })
}