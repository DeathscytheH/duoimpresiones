app.controller('usuariosCtrl', function ($scope, $modal, $filter, Data) {
    $scope.usuario = {};
    Data.get('usuarios').then(function(data){
        $scope.usuarios = data.data;
    });

    $scope.deleteUsuario = function(usuario){
        if(confirm("Estas seguro de eliminar al usuario?")){
            Data.delete("usuarios/"+usuario.id).then(function(result){
                $scope.usuarios = _.without($scope.usuarios, _.findWhere($scope.usuarios, {id:usuario.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/productEdit.html',
          controller: 'usuarioEditCtrl',
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
                p.nombre = selectedObject.nombre;
                p.apellido_paterno = selectedObject.apellido_paterno;
                p.apellido_materno = selectedObject.apellido_materno;
                p.user = selectedObject.user;
                p.pass = selectedObject.pass;
                p.email = selectedObject.email;
                p.tid = selectedObject.tid;
            }
        });
    };

 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Nombre",predicate:"nombre",sortable:true},
                    {text:"Apellido Paterno",predicate:"apellido_paterno",sortable:true},
                    {text:"Apellido Materno",predicate:"apellido_materno",sortable:true},
                    {text:"Usuario",predicate:"user",sortable:true},
                    {text:"Password",predicate:"pass",sortable:true},
                    {text:"Email",predicate:"email",sortable:true},
                    {text:"Tipo de Usuario",predicate:"tid",reverse:true,sortable:true,dataType:"number"},
                    {text:"Accion",predicate:"",sortable:false}
                ];

});


app.controller('usuarioEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.usuario = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Editar usuario' : 'Agregar usuario';
        $scope.buttonText = (item.id > 0) ? 'Actualizar usuario' : 'Agregar nuevo usuario';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.usuario);
        }
        $scope.saveUsuario = function (usuario) {
            if(usuario.id > 0){
                Data.put('usuarios/'+usuario.id, usuario).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(usuario);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('usuarios', usuario).then(function (result) {
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
