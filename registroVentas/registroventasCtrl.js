app.controller('registroventasCtrl', function ($scope, $modal, $filter, Data) {
    $scope.usuario = {};
    Data.get('registroventas').then(function(data){
        $scope.usuarios = data.data;
    });

    $scope.deleteUsuario = function(usuario){
        if(confirm("Estas seguro de eliminar la venta?")){
            Data.delete("registroventas/"+usuario.id).then(function(result){
                $scope.usuarios = _.without($scope.usuarios, _.findWhere($scope.usuarios, {id:usuario.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'registroVentas/registroventasEdit.html',
          controller: 'registroventasEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.usuarios.push(selectedObject);
                $scope.usuarios = $filter('orderBy')($scope.usuarios, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.id = selectedObject.id;
                p.tamano = selectedObject.tamano;
                p.precio = selectedObject.precio;
            }
        });
    };

 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Nombre del cliente",predicate:"nombreCliente",sortable:true},
                    {text:"Telefono del cliente",predicate:"telCliente",sortable:true},
                    {text:"Detalles del pedido",predicate:"detallePedido",sortable:true},
                    {text:"Fecha de registro",predicate:"fechaRegistro",sortable:true},
                    {text:"Precio",predicate:"precio",sortable:true},
                    {text:"Archivo",predicate:"archivo",sortable:true},
                    {text:"Fecha de entrega",predicate:"fechaEntrega",sortable:true},
                    {text:"Accion",predicate:"",sortable:false}
                ];

});


app.controller('registroventasEditCtrl', function ($scope, $modalInstance, item, Data) {

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
                Data.put('registroventas/'+usuario.id, usuario).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(usuario);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('registroventas', usuario).then(function (result) {
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
