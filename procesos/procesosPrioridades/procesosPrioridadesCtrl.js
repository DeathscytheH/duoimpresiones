app.controller('procesosPrioridadesCtrl', function ($scope, $modal, $filter, Data) {
    $scope.usuario = {};
    Data.get('procesosPrioridades').then(function(data){
        $scope.usuarios = data.data;
    });

    $scope.deleteUsuario = function(usuario){
        if(confirm("Estas seguro de eliminar la variable?")){
            Data.delete("procesosPrioridades/"+usuario.id).then(function(result){
                $scope.usuarios = _.without($scope.usuarios, _.findWhere($scope.usuarios, {id:usuario.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'procesos/procesosPrioridades/procesosPrioridadesEdit.html',
          controller: 'procesosPrioridadesEditCtrl',
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
                    {text:"Descripcion",predicate:"nombre_proceso",sortable:true},
                    {text:"Prioridad",predicate:"prioridad_proceso",sortable:true},
                    {text:"Accion",predicate:"",sortable:false}
                ];

});


app.controller('procesosPrioridadesEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.usuario = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Editar proceso' : 'Agregar proceso';
        $scope.buttonText = (item.id > 0) ? 'Actualizar proceso' : 'Agregar nueva proceso';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.usuario);
        }
        $scope.saveUsuario = function (usuario) {
            if(usuario.id > 0){
                Data.put('procesosPrioridades/'+usuario.id, usuario).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(usuario);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('procesosPrioridades', usuario).then(function (result) {
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
