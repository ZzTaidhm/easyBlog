let Sequelize = require('sequelize');
let sequelize = require('../dbCon.js');

let userlist = sequelize.define('userlist',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),          // 标题
    sexy: Sequelize.BIGINT(2),        // 详细内容
    email: Sequelize.STRING(200),        // 详细内容
    tel_phone: Sequelize.STRING(200),
    },
    {
        timestamps: false,               // 不要默认时间戳
        tableName: 'user_info'
    }
);

module.exports = userlist;