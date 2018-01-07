var UserSQL = {
    insertUser:'INSERT INTO xuptmap(id,name,mapSrc,groundSrc,nodeNum,arcNum) VALUES(?,?,?,?,?,?)',//插入
    updata:'UPDATE xuptmap SET type = ?,id = ? WHERE username = ? AND password = ? ',//更新
    queryAll:'SELECT * FROM xuptmap',//查询所有
    getMapByOpenid:'SELECT * FROM xuptmap WHERE id = ? ',//查询id
    getMapByInfo:'SELECT * FROM xuptmap WHERE id = ? AND name = ? ',//查询用户信息
    getEveryMapNode:'SELECT * FROM everymapnode WHERE id = ?'
};
module.exports = UserSQL;