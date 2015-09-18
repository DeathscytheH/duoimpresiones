app.controller('ventasMostradorCtrl', function ($scope, $modal, $filter, $log) {
    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'ventasAdmin/ventasMostradorLonas.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                item: function () {
                    return size;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, Data, $log) {
    /**/
    $scope.cliente = {
        nombre_completo: '',
        email: '',
        telefono: '',
    };

    $scope.tipo = '';

    $scope.largo = 0;
    $scope.ancho = 0;
    $scope.area = 0;
    $scope.bastilla = 'NO';
    $scope.ojillos = 'NO';
    $scope.otros1 = '';
    $scope.date = new Date();

    $scope.pedido = {};

    $scope.lona = {
        nombreCliente: '',
        detalleCliente: '',
        detallePedido: '',
    };

    $scope.detalleLona = {
        id_cliente: $scope.lona.id,
        nombre_cliente: $scope.lona.nombreCliente,
        detalle_pedido:$scope.lona.detallePedido,
        proceso_prioridad:'',
        procesos:'',
        status:'Proceso',
        archivo:'',
        fechaEntrega: $scope.lona.fechaEntrega,
    };

    $scope.$watchCollection('lona', function(newValues){
        $scope.detalleLona.id_cliente = $scope.lona.id;
        $scope.detalleLona.nombre_cliente = $scope.lona.nombreCliente;
        $scope.detalleLona.detalle_pedido = $scope.lona.detallePedido;
        $scope.detalleLona.fechaEntrega = $scope.lona.fechaEntrega;
    });

    //Checar id del cliente, si existe regresa sus datos.
    $scope.checkId = function (id_cliente) {
        Data.get('clientes/' + id_cliente).then(function (data) {
            $scope.clientes = data.data;
            if ($scope.clientes[0]) {
                $scope.cliente = $scope.clientes[0];
            } else {
                $scope.cliente = [];
            }

        });
        return $scope.cliente;
    };

    //Obtener la informacion de la tabla gformato.
    Data.get('gformato').then(function (data) {
        $scope.lonas = data.data;
    });

    //watchGroup para cambiar valores.
    $scope.$watchCollection('cliente', function (newValues, oldValues) {
        $scope.lona.nombreCliente = $scope.cliente.nombre_completo;
        $scope.lona.detalleCliente = 'Email: ' + $scope.cliente.email + ' | ' + 'Telefono: ' + $scope.cliente.telefono;
    });

    $scope.$watchGroup(['tipo', 'largo', 'ancho', 'bastilla', 'ojillos', 'otros1'], function (newValues, oldValues) {
        $scope.area = $scope.largo * $scope.ancho;
        $scope.lona.detallePedido = 'Tipo: ' + $scope.tipo.descripcion + '| Area: ' + $scope.area + 'm2 | Largo: ' + $scope.largo + 'm | Ancho: ' + $scope.ancho + 'm | Bastilla: ' + $scope.bastilla + ' | Ojillos: ' + $scope.ojillos + ' | Otros: ' + $scope.otros1;
    });

    //Registra los datos del cliente.
    $scope.registrarCliente = function (clienteVentana) {
        Data.post('clientes', clienteVentana).then(function (result) {
            if (result.status != 'error') {
                var x = angular.copy(clienteVentana);
                x.save = 'insert';
                x.id = result.data;
            } else {
                console.log(result);
            }
        });
    };

    //Registra el pedido de la lona
    $scope.pedidoLona = function (lona, detalleLona) {
        Data.post('registroventas', lona).then(function (result) {
            if (result.status != 'error') {
                var x = angular.copy(lona);
                x.save = 'insert';
                x.id = result.data;
                $modalInstance.close(x);
            } else {
                console.log(result);
            }
        });

        //Hace la peticion por cada articulo.
        angular.forEach($scope.articulo.procesos, function (value) {
            $scope.detalleLona.proceso_prioridad = value;
            Data.post('detallePedido', detalleLona).then(function (result) {
                if (result.status != 'error') {
                    var x = angular.copy(lona);
                    x.save = 'insert';
                    x.id = result.data;
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
            });
        });
    };

    //Cierra el modal
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    //Prueba de guardar procesos.
    $scope.articulo = {
        procesos: [],
    };
    //Procesos
    Data.get('procesosLonas').then(function (data) {
        $scope.procesos = data.data;
        angular.forEach($scope.procesos, function (value, key) {
            if (value.lona === 1) {
                $scope.articulo.procesos.push(value.prioridad_proceso);
                console.log(value.nombre_proceso + '--' + value.prioridad_proceso);
            }
        });
    });
});
