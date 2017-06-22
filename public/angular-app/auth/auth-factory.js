/**
 * Created by dariusstrasel on 6/18/17.
 */
angular.module('meanNasdaq').factory('AuthFactory', AuthFactory);

function AuthFactory() {
    return {
        auth: auth
    };

    var auth = {
        isLoggedIn: false
    };
}