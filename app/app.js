var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      title: 'Usuarios',
      templateUrl: 'partials/products.html',
      controller: 'usuariosCtrl'
    })
    //Pulseras eventos
    .when('/pulseras_eventos', {
      title: 'Pulseras para eventos',
      templateUrl: 'partials/pulseras.html',
      controller: 'pulserasCtrl'
    })
    /*
    when('/tid', {
      title: 'Tipo de usuarios',
      templateUrl: 'partials/tipoUsuarios.html',
      controller: 'tipoUsuariosCtrl'
    }) */

    .otherwise({
      redirectTo: '/'
    });;
}]);
