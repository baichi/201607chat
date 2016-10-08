var express = require('express');
var path = require('path');
var app = express();
app.get('/',function(req,res){
    res.sendFile(path.resolve('app/index.html'));
});
//把public目录作为静态文件根目录
app.use(express.static(path.resolve('public')));
//把app目录作为静态文件根目录
app.use(express.static(path.resolve('app')));
app.listen(9090);