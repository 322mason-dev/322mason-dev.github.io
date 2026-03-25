var app = angular.module("mgpApp", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider){

    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "HomeCtrl"
        })
        .when("/about", {
            templateUrl: "views/about.html",
            controller: "AboutCtrl"
        })
        .when("/menu", {
            templateUrl: "views/menu.html",
            controller: "MenuCtrl"
        })
        .when("/order", {
            templateUrl: "views/order.html",
            controller: "OrderCtrl"
        })
        .when("/contact", {
            templateUrl: "views/contact.html",
            controller: "ContactCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });

    // $locationProvider.html5Mode(true);
});
