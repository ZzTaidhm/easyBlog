
// 用于连接数据库并且定义Schema 和 Model
const mongoose = require('mongoose');
const config = require('./config');
module.exports = () => {
    mongoose.connect(config.mongodb);  // 连接数据库

    // 实例化连接对象
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, '连接错误： '));
    db.once('open', (callback) => {
        console.log('MongoDB连接成功！');
    });
    return db;
}