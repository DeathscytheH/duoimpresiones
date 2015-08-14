app.controller('VentasController', function ($scope, $modalInstance, item, Data) {
    $scope.orden;
    Data.post('ventas_admin', orden).then(function (result) {
        if (result.status != 'error') {
            var x = angular.copy(orden);
            x.save = 'insert';
            x.id = result.data;
            $modalInstance.close(x);
        } else {
            console.log(result);
        }
    });
});
