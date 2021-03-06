app.controller('tarjetasCtrl', function ($scope, $modal, $filter, Data) {
    $scope.usuario = {};
    Data.get('tarjetas_presentacion').then(function(data){
        $scope.usuarios = data.data;
    });

    $scope.deleteUsuario = function(usuario){
        if(confirm("Estas seguro de eliminar el producto?")){
            Data.delete("tarjetas_presentacion/"+usuario.id).then(function(result){
                $scope.usuarios = _.without($scope.usuarios, _.findWhere($scope.usuarios, {id:usuario.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'tarjetas/tarjetasEdit.html',
          controller: 'tarjetasEditCtrl',
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
                p.piezas = selectedObject.piezas;
                p.precio = selectedObject.precio;
            }
        });
    };

 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Descripcion",predicate:"descripcion",sortable:true},
                    {text:"Piezas",predicate:"piezas",sortable:true},
                    {text:"Frente",predicate:"frente",sortable:true},
                    {text:"Frente/Vuelta",predicate:"frente/vuelta",sortable:true},
                    {text:"Plastico frente",predicate:"Plastico frente",sortable:true},
                    {text:"Plastico frente/vuelta",predicate:"Plastico frente/vuelta",sortable:true},
                    {text:"Suaje",predicate:"suaje",sortable:true},
                    {text:"Frente Maquila",predicate:"frenteMaq",sortable:true},
                    {text:"Frente/Vuelta Maquila",predicate:"frente/vueltaMaq",sortable:true},
                    {text:"Plastico frente Maquila",predicate:"Plastico frente Maq",sortable:true},
                    {text:"Plastico frente/vuelta Maquila",predicate:"Plastico frente/vuelta Maq",sortable:true},
                    {text:"Suaje Maquila",predicate:"suaje Maq",sortable:true},
                    {text:"Accion",predicate:"",sortable:false},
                ];

});


app.controller('tarjetasEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.usuario = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Editar tarjeta' : 'Agregar tarjeta';
        $scope.buttonText = (item.id > 0) ? 'Actualizar tarjeta' : 'Agregar nueva tarjeta';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.usuario);
        }
        $scope.saveUsuario = function (usuario) {
            if(usuario.id > 0){
                Data.put('tarjetas_presentacion/'+usuario.id, usuario).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(usuario);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('tarjetas_presentacion', usuario).then(function (result) {
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
