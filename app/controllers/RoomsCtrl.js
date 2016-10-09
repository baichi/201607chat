angular.module('chatMod').controller('RoomsCtrl',function($scope,$http,$rootScope){
   $scope.rooms = [];
    /**
     * 1. 在控制器里立刻调用后台接口 get /rooms，获取房间列表
     * 2. 服务器端要实现 get /rooms这个路由，
     * 3. 在路由里要调Room 模型的find方法查询所有的房间列表文档数组
     * 4. 为了Room,需要先在db/index.js里定义对应的模型和schema,字段只有一个name,类型是string
     */
    $http({
        url:'/rooms',
        method:'GET',
    }).success(function(result){
       if(result.err==0){//如果没有出错，就把返回来的房间数组赋给$scope.rooms属性
           $scope.rooms = result.data;
       }else{
          $rootScope.errorMsg = result.msg;
       }
    });
});