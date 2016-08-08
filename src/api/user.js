// process.env.NODE_ENV = 'test';
var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = function() {
    return process.env.NODE_ENV == "test" ? "postgres://omarmhadden:eal281095@localhost:5432/dumpdb":"postgres://omarmhadden:eal281095@localhost:5432/Omar";
}

router.get("/users",function(req,res){
  var conn = conString();
  pg.connect(conn,function(err,client,done){
  var rows = [];
  var query = client.query("select * from testing.person_test");
      query.on('row',function(row){
        rows.push(row);
      })
      query.on('end',function(){
        res.json(rows);
        client.end();
      })
    });
});
router.get("/user/:id",function(req,res){
  var conn = conString();
  pg.connect(conn,function(err,client,done){
    var rows = [];
    var query = client.query("select * from testing.person_test where name = $1;",[req.params.id]);
      query.on('row',function(row){
        rows.push(row);
      })
      query.on('end',function(){
        res.json(rows);
        client.end();
      })
  });
});
router.post("/user",function(req,res){
  var conn = conString();
  pg.connect(conn,function(err,client,done){
    var query = client.query("INSERT INTO testing.person_test (name) VALUES ($1)",[req.body.name]);
    query.on('end',function(){
        res.json({name:req.body.name});
        client.end();
    });
  });
});
router.put("/user/:id",function(req,res){
  var conn = conString();
  pg.connect(conn,function(err,client,done){
    userData = {userName:req.params.id,userNameNew:req.body.name};
    var query = client.query("update testing.person_test set name = $1 where name = $2;",[userData.userNameNew,userData.userName]);
    query.on('end',function(){
        res.json({msg:"Update Workin"});
        client.end();
    });
  });
});
router.delete("/user/:id",function(req,res){
  var conn = conString();
  pg.connect(conn,function(err,client,done){
    var query = client.query("delete from testing.person_test where name = $1;",[req.params.id]);
    query.on('end',function(){
      res.json({'msg':"Delete Workin"});
      client.end();
    });
  });
});
module.exports = router;
