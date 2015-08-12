app.controller('vinilcorteCtrl', function ($scope, $modal, $filter, Data) {
    $scope.usuario = {};
    Data.get('vinil_corte').then(function(data){
        $scope.usuarios = data.data;
    });

    $scope.deleteUsuario = function(usuario){
        if(confirm("Estas seguro de eliminar el producto?")){
            Data.delete("vinil_corte/"+usuario.id).then(function(result){
                $scope.usuarios = _.without($scope.usuarios, _.findWhere($scope.usuarios, {id:usuario.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'vinilcorte/vinilcorteEdit.html',
          controller: 'vinilcorteEditCtrl',
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
                    {text:"Descripcion",predicate:"descripcion",sortable:true},
                    {text:"Tamano",predicate:"tamano",sortable:true},
                    {text:"Precio",predicate:"precio",sortable:true},
                    {text:"Precio Maquila",predicate:"precioMaq",sortable:true},
                    {text:"Accion",predicate:"",sortable:false}
                ];

});


app.controller('vinilcorteEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.usuario = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Editar vinil corte' : 'Agregar vinil corte';
        $scope.buttonText = (item.id > 0) ? 'Actualizar vinil corte' : 'Agregar nueva vinil corte';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.usuario);
        }
        $scope.saveUsuario = function (usuario) {
            if(usuario.id > 0){
                Data.put('vinil_corte/'+usuario.id, usuario).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(usuario);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('vinil_corte', usuario).then(function (result) {
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
