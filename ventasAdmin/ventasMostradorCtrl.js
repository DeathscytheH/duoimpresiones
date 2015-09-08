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
    $scope.cliente = {};

    $scope.lona = {};

    //Checar id del cliente, si existe regresa sus datos.
    $scope.checkId = function (id_cliente){
        Data.get('clientes/' + id_cliente).then(function (data) {
            $scope.cliente = data.data;
        });
        return $scope.cliente;
    };

    //Obtener la informacion de la tabla gformato.
    Data.get('gformato').then(function(data){
        $scope.lonas = data.data;
    });

    //watchGroup para cambiar valores.

    $scope.$watchGroup('cliente', function(newValues, oldValues, scope){
        lona.nombreCliente = cliente[0].nombre_completo;
    });

    //Registra los datos del cliente.
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

    //Registra el pedido de la lona
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

    //Cierra el modal
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };



});
