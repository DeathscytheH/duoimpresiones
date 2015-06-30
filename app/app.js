var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Usuarios',
      templateUrl: 'partials/products.html',
      controller: 'usuariosCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
