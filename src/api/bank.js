var pg = require('pg');
var conString = function() {
  return process.env.NODE_ENV == "test" ? "postgres://omarmhadden:eal281095@localhost:5432/dumpdb":"postgres://omarmhadden:eal281095@localhost:5432/Omar";
}

var Bank = function() {
    this.connectUser = function(req,res){
      var conn = conString();
      pg.connect(conn,function(err,client,done){
      var rows = [];
      var query = client.query("select * from testing.bank_data where card_id = $1",[req.body.id]);
          query.on('row',function(row){
            rows.push(row);
          })
          query.on('end',function(){
            if (rows.length != 1) {
              res.json("FAIL");
            }
            else {
              this.card_id = rows[0].card_id;
              client.end();
              res.json("SUCESS");
            }
          })
        });
    }
    // DEOPSIT
      this.Deposite = function(req,res){
      var conn = conString();

      pg.connect(conn,function(err,client,done){
      var rows = [];
      var rows1 = [];
      var money = 0;
      var query1 = client.query("select balance from testing.bank_data where card_id = $1",[req.body.id]);
      query1.on('row',function(row){
        rows1.push(row);
      })
      query1.on('end',function(){
        money = parseInt(rows1[0].balance.toString());
        money = money +  parseInt(req.body.value,10);
        client.query("update testing.bank_data set balance = $1 where card_id = $2",[money,req.body.id]);
        var query = client.query("insert into testing.bank_transaction (transaction_date,description,balance_at,card_id) Values(now(),$1,$2,$3)",["desc",money,55]);
            query.on('row',function(row){
              rows.push(row);
            })
            query.on('end',function(){
              res.json(rows);
              client.end();
            })
      })
    });
    }
    // Withdraw
    this.Withdraw = function(req,res){
      var conn = conString();

      pg.connect(conn,function(err,client,done){
      var rows = [];
      var rows1 = [];
      var money = 0;
      var query1 = client.query("select balance from testing.bank_data where card_id = $1",[req.body.id]);
      query1.on('row',function(row){
        rows1.push(row);
      })
      query1.on('end',function(){
        money = parseInt(rows1[0].balance.toString());
        money = money -  parseInt(req.body.value,10);
        client.query("update testing.bank_data set balance = $1 where card_id = $2",[money,req.body.id]);
        var query = client.query("insert into testing.bank_transaction (transaction_date,description,balance_at,card_id) Values(now(),$1,$2,$3)",["desc",money,55]);
            query.on('row',function(row){
              rows.push(row);
            })
            query.on('end',function(){
              res.json(rows);
              client.end();
            })
          })
      });
    }
    //CHECK BALANCE
    this.CheckBalance = function(req,res){
      var conn = conString();
      try {
        pg.connect(conn,function(err,client,done){
        var rows = [];
        var query = client.query("select balance from testing.bank_data where card_id = $1;",[req.body.id]);
            query.on('row',function(row){
              rows.push(row);
            })
            query.on('end',function(){
              res.json(rows);
              client.end();
            })
          });
      } catch (err) {
        throw(err);
      }
    }
    // TRANSFER
    this.Transfer = function(req,res){
      var conn = conString();
      try {        
        pg.connect(conn,function(err,client,done){
        var rows1 = [];
        var rows2 = [];
        var rows = [];
        var moneySender;
        var moneyReceiver
        var query1 = client.query("select balance from testing.bank_data where card_id = $1",[req.body.idSender]);
        query1.on('row',function(row){
          rows1.push(row);
        })
        query1.on('end',function(){
          moneySender= parseInt(rows1[0].balance.toString());
          moneySender = moneySender -  parseInt(req.body.value,10);
          var query2 = client.query("select balance from testing.bank_data where card_id = $1",[req.body.idReceiver]);
          query2.on('row',function(row){
            rows2.push(row);
          })
          query2.on('end',function(){
            moneyReceiver = parseInt(rows2[0].balance.toString());
            moneyReceiver = moneyReceiver + parseInt(req.body.value,10);
            client.query("update testing.bank_data set balance = $1 where card_id = $2",[moneySender,req.body.idSender]);
            client.query("update testing.bank_data set balance = $1 where card_id = $2",[moneyReceiver,req.body.idReceiver]);
            client.query("insert into testing.bank_transaction (transaction_date,description,balance_at,card_id) Values(now(),$1,$2,$3)",["Transfered to 54",req.body.value,55]);
            var q = client.query("insert into testing.bank_transaction (transaction_date,description,balance_at,card_id) Values(now(),$1,$2,$3)",["recieved from 55",req.body.value,54]);
            q.on('end',function(){
              res.json(rows);
              client.end();
            })
          })
        })
      })
    } catch (err) {
        throw(err);
      }
    }
    this.getHistory = function(req,res){
      var conn = conString();
      try {
        pg.connect(conn,function(err,client,done){
          var rows = [];
          var query = client.query("select bank_data.card_id,name,transaction_date,description,balance_at from testing.bank_transaction,testing.bank_data where bank_transaction.card_id = $1 and"
          + " testing.bank_data.card_id = testing.bank_transaction.card_id;",[req.body.id]);
          query.on('row',function(row){
            rows.push(row);
          });
          query.on('end',function(){
            res.json(rows);
            client.end();
          });
        });
      } catch (err){
        throw(err);
      }
    }
}
exports.bankinit = function(){
  return new Bank();
}

// const returned = [router,x];
// module.exports = bankinit;
