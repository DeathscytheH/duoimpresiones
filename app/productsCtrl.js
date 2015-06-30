app.controller('usuariosCtrl', function ($scope, $modal, $filter, Data) {
    $scope.usuario = {};
    Data.get('usuarios').then(function(data){
        $scope.usuarios = data.data;
    });
    //1
    $scope.changeUsuarioStatus = function(usuario){
        usuario.status = (usuario.status=="Activo" ? "Inactivo" : "Activo");
        Data.put("usuarios/"+usuario.id,{status:usuario.status});
    };
    $scope.deleteUsuario = function(usuario){
        if(confirm("¿Estas seguro de eliminar al usuario?")){
            Data.delete("usuarios/"+usuario.id).then(function(result){
                $scope.usuarios = _.without($scope.usuarios, _.findWhere($scope.usuarios, {id:usuario.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/usuarioEdit.html',
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
                p.description = selectedObject.description;
                p.price = selectedObject.price;
                p.stock = selectedObject.stock;
                p.packing = selectedObject.packing;
            }
        });
    };

 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Nombre",predicate:"nombre",sortable:true},
                    {text:"Apellido Paterno",predicate:"apellido_paterno",sortable:true},
                    {text:"Apellido Materno",predicate:"apellido_materno",sortable:true},
                    {text:"Usuario",predicate:"usuario",sortable:true},
                    {text:"Password",predicate:"pass",sortable:true},
                    {text:"Email",predicate:"email",sortable:true},
                    {text:"Tipo de Usuario",predicate:"tid",reverse:true,sortable:true,dataType:"number"},
                    {text:"Status",predicate:"status",sortable:true},
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
            usuario.uid = $scope.uid;
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
                usuario.status = 'Activo';
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
