app.controller('procesosProductosCtrl', function ($scope, $modal, $filter, Data) {
    $scope.usuario = {};
    Data.get('procesosProductos').then(function (data) {
        $scope.usuarios = data.data;
    });

    $scope.deleteUsuario = function (usuario) {
        if (confirm("Estas seguro de eliminar la variable?")) {
            Data.delete("procesosProductos/" + usuario.id).then(function (result) {
                $scope.usuarios = _.without($scope.usuarios, _.findWhere($scope.usuarios, {
                    id: usuario.id
                }));
            });
        }
    };
    $scope.open = function (p, size) {
        var modalInstance = $modal.open({
            templateUrl: 'procesos/procesosProductos/procesosProductosEdit.html',
            controller: 'procesosProductosEditCtrl',
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
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Nombre producto",predicate:"nombre_producto",sortable:true},
                    {text:"Ventas",predicate:"ventas",sortable:true},
                    {text:"Diseño",predicate:"diseño",sortable:true},
                    {text:"Produccion",predicate:"produccion",sortable:true},
                    {text:"Gran formato",predicate:"gran_formato",sortable:true},
                    {text:"Acabado",predicate:"acabado",sortable:true},
                    {text:"Offset y corte",predicate:"offset_corte",sortable:true},
                    {text:"Foliado",predicate:"foliado",sortable:true},
                    {text:"Entrega",predicate:"entrega",sortable:true},
                    {text:"Domicilio y/o instalacion",predicate:"domicilio_instalacion",sortable:true},
                    {text:"Accion",predicate:"",sortable:false}
                ];

});


app.controller('procesosProductosEditCtrl', function ($scope, $modalInstance, item, Data) {

    $scope.usuario = angular.copy(item);

    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
    };
    $scope.title = (item.id > 0) ? 'Editar producto' : 'Agregar producto';
    $scope.buttonText = (item.id > 0) ? 'Actualizar producto' : 'Agregar nueva producto';

    var original = item;
    $scope.isClean = function () {
        return angular.equals(original, $scope.usuario);
    }
    $scope.saveUsuario = function (usuario) {
        if (usuario.id > 0) {
            Data.put('procesosProductos/' + usuario.id, usuario).then(function (result) {
                if (result.status != 'error') {
                    var x = angular.copy(usuario);
                    x.save = 'update';
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
            });
        } else {
            Data.post('procesosProductos', usuario).then(function (result) {
                if (result.status != 'error') {
                    var x = angular.copy(usuario);
                    x.save = 'insert';
                    x.id = result.data;
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
            });
        }
    };
});
