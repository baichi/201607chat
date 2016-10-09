var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl);
//定义用户的数据结构骨架
var UserSchema = new mongoose.Schema({
    email: String,
    avatar: String
});
//定义可以操作用户User集合的模型对象
var User = mongoose.model('User', UserSchema);
//把此用户模型进行导出 require('db').User
exports.User = User;


