angular.module('chatMod').controller('LoginCtrl',function($scope,$http){
    $scope.login = function(){
        $http({
            url:'/user/login',
            method:'POST',
            data:{email:$scope.email}
        }).success(function(result){
            console.log(result);
        });
    }
});