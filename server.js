const http=require('http');
const fs=require('fs');
const querystring=require('querystring');
const urlLib=require('url');
const mysql = require('mysql');

var dbSqlConfig = require("./libs/dbConfig");
var userSql = require("./libs/userSql");


//连接池
var db=mysql.createPool(dbSqlConfig.mysql);

var server=http.createServer(function (req, res){
  //解析数据
  var str='';
  req.on('data', function (data){
    str+=data;
  });
  req.on('end', function (){
    var obj=urlLib.parse(req.url, true);

    const url=obj.pathname;
    const GET=obj.query;
    const POST=querystring.parse(str);

    //区分——接口、文件
    if(url=='/mapInfo'){//接口
      switch(GET.act){
        case 'searchMap':
            db.query(userSql.queryAll,function(err,results){
               if(err){
                   console.log("数据库错误！！");
               }
               else{
                   if(GET.id){
                       var resultInfo = JSON.stringify(results);
                       res.write('{"ok": "true", "msg": "查询成功","result":'+resultInfo+'}');
                       res.end();
                   }else{
                       res.write('{"ok": fal' +
                           'se, "msg": "id错误！！"}');
                       res.end();
                   }
               }
            });
          break;
          case 'searchGrah':
              db.query(userSql.getEveryMapNode,[GET.id],function(err,results){
                  if(err){
                      console.log("数据库错误！！");
                  }
                  else{
                      if(GET.id){
                          var resultInfo = JSON.stringify(results);
                          res.write('{"ok": "true", "msg": "查询成功","result":'+resultInfo+'}');
                          res.end();
                      }else{
                          res.write('{"ok": false, "msg": "id错误！！"}');
                          res.end();
                      }
                  }
              });
              break;
        default:
          res.write('{"ok": false, "msg": "未知的act"}');
          res.end();
      }
    }else{              //文件
      //读取文件
      var file_name='./www'+url;
      fs.readFile(file_name, function (err, data){
        if(err){
          res.write('404');
        }else{
          res.write(data);
        }
        res.end();
      });
    }
  });
});

server.listen(9090);
