let userlist = require('../models/userList');

// 同步表结构
userlist.sync({
    // force: true  // 强制同步，先删除表，然后新建
    alter: true
});

module.exports = userlist;