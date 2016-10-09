var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var User = require('./db').User;
var Room = require('./db').Room;
var app = express();
app.get('/',function(req,res){
    res.sendFile(path.resolve('app/index.html'));
});
//把public目录作为静态文件根目录
app.use(express.static(path.resolve('public')));
//把app目录作为静态文件根目录
app.use(express.static(path.resolve('app')));
/**
 * 1. 获取请求体对象 客户端传过来的请求体格式是JSON，
 */
app.use(bodyParser.json());
app.post('/user/login',function(req,res){
    var email = req.body.email;
    var user = {email};
    User.findOne(user,function(err,doc){
      if(err){
          res.send({err:1,msg:'查询出错',data:err});
      }else{
          if(doc){
              res.send({err:0,msg:'成功',data:doc});
          }else{
              user.avatar = 'https://secure.gravatar.com/avatar/email?s=32';
              //保存此用户之后得到一个保存之后的文档 _id
              User.create(user,function(err,doc2){
                  if(err){
                      res.send({err:1,msg:'保存出错',data:err});
                  }else{
                      res.send({err:0,msg:'成功',data:doc2});
                  }
              });
          }
      }
    })
});
//编写获取房间列表的接口 也就是路由 当客户端get /rooms路径发起请求的时候
app.get('/rooms',function(req,res){
    //调用Model的find方法查询所有的房间 条件为空
    Room.find({},function(err,rooms){//返回一个房间对象的数组
        if(err){
            res.send({err:1,msg:'查询出错',data:err});
        }else{
            res.send({err:0,msg:'成功',data:rooms});
        }
    });
});
//增加房间的路由
app.post('/rooms',function(req,res){
   var room = req.body;
   Room.create(room,function(err,doc){
       if(err){
           res.send({err:1,msg:'增加房间出错',data:err});
       }else{
           //把保存成功之后的文档对象发回给客户端
           res.send({err:0,msg:'成功',data:doc});
       }
   });
});
app.listen(9090);