app.controller('ventasMostradorCtrl', function ($scope, $modal, $filter, Data) {
    $scope.usuario = {};
    Data.get('gformato').then(function(data){
        $scope.usuarios = data.data;
    });

    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'ventasAdmin/ventasMostradorLonas.html',
          //controller: 'ventasMostradorEditCtrl',
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
                    {text:"Descripcion",predicate:"nombreVariable",sortable:true},
                    {text:"Tiempo en minutos",predicate:"tiempo",sortable:true},
                    {text:"Accion",predicate:"",sortable:false}
                ];

});
