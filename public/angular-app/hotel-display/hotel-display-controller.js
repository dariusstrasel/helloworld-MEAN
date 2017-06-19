/**
 * Created by dariusstrasel on 6/15/17.
 */

angular.module("meanhotel").controller('HotelController', HotelController);

function HotelController( $route, $routeParams, $window, hotelDataFactory, AuthFactory, jwtHelper) {
    var vm = this;
    var id = $routeParams.id;
    vm.isSubmitted = false;
    hotelDataFactory.hotelDisplay(id).then(function (response) {
        vm.hotel = response;
        vm.stars = _getStarRating(response.stars);
    });

    function _getStarRating(stars) {
        return new Array(stars);
    }

    vm.isLoggedIn = function () {
        return AuthFactory.isLoggedIn;
    };

    vm.addReview = function () {

        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;

        var postData = {
            name: username,
            rating: vm.rating,
            review: vm.review
        };
        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id, postData).then(function (response) {
                console.log("response:", response);
                $route.reload();
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };
}