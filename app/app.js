var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/usuarios', {
      title: 'Usuarios',
      templateUrl: 'partials/products.html',
      controller: 'usuariosCtrl'
    })
    //Pulseras eventos
    .when('/pulseras_eventos', {
      title: 'Pulseras',
      templateUrl: 'pulseras/pulseras.html',
      controller: 'pulserasCtrl'
    })
    //Tarjetas presentacion
    .when('/tarjetas_presentacion', {
      title: 'Tarjetas',
      templateUrl: 'tarjetas/tarjetas.html',
      controller: 'tarjetasCtrl'
    })
    //Tabloide color
    .when('/tabloide_color', {
      title: 'Tabloide',
      templateUrl: 'tabloide/tabloide.html',
      controller: 'tabloideCtrl'
    })
    //Fotobotones
    .when('/fotobotones', {
      title: 'Fotobotones',
      templateUrl: 'fotobotones/fotobotones.html',
      controller: 'fotobotonesCtrl'
    })
    //Vinil corte
    .when('/vinil_corte', {
      title: 'Vinil de corte',
      templateUrl: 'vinilcorte/vinilcorte.html',
      controller: 'vinilcorteCtrl'
    })
    //Volante blanco y negro
    .when('/volantebn', {
      title: 'Volante blanco y negro',
      templateUrl: 'volantebn/volantebn.html',
      controller: 'volantebnCtrl'
    })
    .when('/volantecolor', {
      title: 'Volante color',
      templateUrl: 'volantecolor/volantecolor.html',
      controller: 'volantecolorCtrl'
    })
    .when('/gformato', {
      title: 'Lonas/Viniles',
      templateUrl: 'gformato/gformato.html',
      controller: 'gformatoCtrl'
    })
    .when('/registroventas', {
      title: 'Registro ventas',
      templateUrl: 'registroVentas/registroventas.html',
      controller: 'registroventasCtrl'
    })
    .when('/tiemposGranFormato', {
      title: 'Tiempo - Gran formato',
      templateUrl: 'tiempos/gran_formato/tiempoGranFormato.html',
      controller: 'tiemposGranFormatoCtrl'
    })
    //Prueba
    .when('/prueba', {
      title: 'Pulseras',
      template: "<h1>prueba!!!</h1>"
    })
    /*
    when('/tid', {
      title: 'Tipo de usuarios',
      templateUrl: 'partials/tipoUsuarios.html',
      controller: 'tipoUsuariosCtrl'
    }) */
    .otherwise({
      redirectTo: '/prueba'
    });;
}]);
