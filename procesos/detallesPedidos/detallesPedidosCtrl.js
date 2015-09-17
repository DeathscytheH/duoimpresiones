app.controller('detallePedidoCtrl', function ($scope, $modal, $filter, Data) {
    $scope.usuario = {};
    Data.get('detallePedido').then(function (data) {
        $scope.usuarios = data.data;
    });

    $scope.changeProductStatus = function (product) {
        product.status = (product.status == "Proceso" ? "Activo" : "Proceso");
        Data.put("detallePedido/" + product.id, {
            status: product.status
        });
    };

    $scope.deleteUsuario = function (usuario) {
        if (confirm("Estas seguro de eliminar la venta?")) {
            Data.delete("detallePedido/" + usuario.id).then(function (result) {
                $scope.usuarios = _.without($scope.usuarios, _.findWhere($scope.usuarios, {
                    id: usuario.id
                }));
            });
        }
    };
    $scope.open = function (p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'detallePedido/detallePedidoEdit.html',
            controller: 'detallePedidoEditCtrl',
            size: size,
            resolve: {
                item: function () {
                    return p;
                }
            }
        });
        modalInstance.result.then(function (selectedObject) {
            if (selectedObject.save == "insert") {
                $scope.usuarios.push(selectedObject);
                $scope.usuarios = $filter('orderBy')($scope.usuarios, 'id', 'reverse');
            } else if (selectedObject.save == "update") {
                p.id = selectedObject.id;
                p.tamano = selectedObject.tamano;
                p.precio = selectedObject.precio;
            }
        });
    };
 $scope.columns = [
                    {text:"Id de venta",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Id del cliente",predicate:"nombreCliente",sortable:true},
                    {text:"Nombre del cliente",predicate:"detalleCliente",sortable:true},
                    {text:"Detalles del pedido",predicate:"detallePedido",sortable:true},
                    {text:"Proceso prioridad",predicate:"fechaRegistro",sortable:true},
                    {text:"Procesos",predicate:"precioTotal",sortable:true},
                    {text:"Archivo",predicate:"archivo",sortable:true},
                    {text:"Fecha de entrega",predicate:"fechaEntrega",sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Accion",predicate:"",sortable:false}
                ];

});


app.controller('detallePedidoEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.usuario = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Editar ventas' : 'Agregar ventas';
        $scope.buttonText = (item.id > 0) ? 'Actualizar ventas' : 'Agregar nueva venta';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.usuario);
        }
        $scope.saveUsuario = function (usuario) {
            if(usuario.id > 0){
                Data.put('detallePedido/'+usuario.id, usuario).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(usuario);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('detallePedido', usuario).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(usuario);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});
