const Sequelize = require('sequelize');
// 数据库配置文件
let sqlConfig = {
    host: "localhost",
    user: "root",
    password: "123456789#",
    name: "blog"
};

let sequelize = new Sequelize(sqlConfig.name, sqlConfig.user, sqlConfig.password, {
    host: sqlConfig.host,
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
module.exports = sequelize;