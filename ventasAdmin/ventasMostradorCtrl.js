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
    $scope.lona = {
        //nombreCliente: $scope.nombreCliente,
        //detalleCliente: $scope.mail + " " + $scope.tel,
        //detallePedido: "Tipo - " + $scope.tipo + ";" + " Medidas - " + "Ancho: " + $scope.ancho + " Largo: " + $scope.largo + " Bastilla - " + $scope.bastilla + ";" + " Ojillos - " + $scope.ojillos + ";" + " Otros - " + $scope.otros1,
        //precioTotal: $scope.precioTotal,
        //fechaEntrega: $scope.fechaEntrega,
    };
    $scope.cliente = {};
    $scope.checkId = function (id_cliente){
        Data.get('clientes/' + id_cliente).then(function (data) {
            $scope.cliente = data.data;
        });
        return $scope.cliente;
    };

    $scope.registrarCliente = function(clienteVentana){
        Data.post('clientes', clienteVentana).then(function (result) {
            if(result.status != 'error'){
                var x = angular.copy(clienteVentana);
                x.save = 'insert';
                x.id = result.data;
            }else{
                console.log(result);
            }
        });
    };
    $scope.pedidoLona = function (lona) {
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
    };

    $scope.ok = function () {
        $modalInstance.close($scope.precio);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /*
    var precio;
    Data.get('gformato').then(function (data) {
        gformato = data.data;
        lonas = angular.fromJson(gformato);
        angular.forEach(lonas, function (e) {
            if ($scope.piezas <= e.piezas) {
                console.log("Entre 1-10 " + e.piezas + " " + $scope.piezas);
                if (angular.equals($scope.tipo, e.tipo)) {
                    console.log("Si son iguales los tipos " + e.tipo + " " + $scope.tipo);
                    if ($scope.maquila) {
                        console.log("Si es maquila " + e.precioMaq + " " + $scope.maquila);
                        $scope.precio = e.precioMaq;
                    } else {
                        console.log("No es maquila " + e.precio + " " + $scope.maquila);
                        $scope.precio = e.precio;
                    }
                }
            } else {
                console.log("Mayor de 10 " + e.piezas);
                if (angular.equals($scope.tipo, e.tipo)) {
                    console.log("Si son iguales los tipo " + e.tipo);
                    if ($scope.maquila) {
                        console.log("Si es maquila " + e.precioMaq);
                        $scope.precio = e.precioMaq;
                    } else {
                        console.log("No es maquila " + e.precio);
                        $scope.precio = e.precio;
                    }
                }
            }
        });

    });*/
});
