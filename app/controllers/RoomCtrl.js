angular.module('chatMod').controller('RoomCtrl',function($routeParams){
    /**
     * 1. 在控制器中注入 $routeParams,这是一个对象，key是路径占位符，值就是路径里占位符对应的字符串
     * 2. 拼出url /rooms/真实id 调用后台接口得到room对象
     * 3. 后台编写一个路由响应这个请求 app.get('/rooms/:_id')
     * 4. 通过Room模型的findById方法传入id,得到room对象并返回给客户端
     * 5. 客户端拿到room赋给$scope.room
     */
    var roomId = $routeParams.id;//id是房间的_id
    $http({
        url:`/rooms/${roomId}`,//获取某个房间的文档对象
        method:'GET'//请求的方法为GET
    }).success(function(result){
       if(result.err ==0){
           //把取回来的房间对象赋给room {name,messages,users}
           $scope.room = result.data;
       }else{
           $rootScope.errorMsg = result.msg;
       }
    });

});