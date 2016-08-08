process.env.NODE_ENV = 'test';
var mocha = require('mocha');
var expect  = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require('request');
// var server = require('../app.js')
var status = require('http-status');
var should = chai.should();
var server = require('../../app.js');
var exec = require('child_process').exec;
// const sleep = require('thread-sleep');


chai.use(chaiHttp);

function SetDB(done) {
  exec('createdb dumpdb',function(err){
    if (err !== null) {
      console.log('exec error' + err);
    }
    exec('psql -d dumpdb -f banktestdb.sql',function(err){
      if (err !== null) {
        console.log('exec error' + err);
      }
      done();
    });
  });
}
function FillDB(done){
  exec('psql -d dumpdb -f insertdata.sql',function(err){
    if (err !== null) {
      console.log('exec error' + err);
    }
    done();
  })
}
function ClearDB(done){
  exec('psql -d dumpdb -f cleardata.sql',function(err){
    if (err !== null) {
      console.log('exec error' + err);
    }
    done();
  })
}
function DropDB() {
  exec('psql -d postgres -f dropdb.sql',function(err){
    if (err !== null) {
      console.log('exec error' + err);
    }
  });
}

describe('test http requests', function() {
      before(function(done){
        SetDB(done);
      });
      beforeEach(function(done){
        FillDB(done);
      });
      afterEach(function(done){
        ClearDB(done);
      });
      after(function(done){
        DropDB();
        this.timeout(2200);
        setTimeout(done, 2100);    //droppin db apparently takes sometime, thus the timeout had to be set to more than 2000ms
      });
      it('getHistory', done => {
          chai.request(server)
            .post("/getHistory")
            .send({'id':55})
            .end(function(err,res){
              res.should.have.status(200);
              res.should.be.json;
              res.body.length.should.equal(0);
              res.body.should.be.array;
              // res.body[0].should.be.null;
              done();
            })
      });
      it('Connect user SUCESS', done => {
        chai.request(server)
          .post("/connect")
          .send({'id':55})
          .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.equal("SUCESS");
            done();
          })
      });
      it('Connect user SUCESS', done => {
        chai.request(server)
          .post("/connect")
          .send({'id':51})
          .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.equal("FAIL");
            done();
          })
      });
      // it('Check balance', done => {
      //   chai.request(server)
      //     .post("/checkBalance")
      //     .send({'id':54})
      //     .end(function(req,res,err){
      //       // req.body.id.should.equal(54);
      //       res.should.have.status(200);
      //       res.should.be.json;
      //       res.body[0].balance.should.not.be.a("null");
      //       res.body[0].should.have.property('balance');
      //       res.body[0].balance.should.equal("0");
      //       done();
      //     })
      // });
      it('Deposite', done => {
        var money;
        chai.request(server)
          .post("/checkBalance")
          .send({'id':54})
          .end(function(err,res){
            money = res.body[0].balance;
            chai.request(server)
              .post("/Deposite")
              .send({'value':200,'id':54})
              .end(function(err,res){
                chai.request(server)
                  .post("/checkBalance")
                  .send({"id":54})
                  .end(function(err,res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].balance.should.equal((parseInt(money.toString()) + 200).toString());
                    done();
                  })
              })
          })
      });
      // it('Withdraw', done => {
      //   var money;
      //   chai.request(server)
      //     .get("/checkBalance")
      //     .end(function(err,res){
      //       money = res.body[0].balance;
      //       chai.request(server)
      //         .post("/Withdraw")
      //         .send({'value':200,'id':55})
      //         .end(function(err,res){
      //           chai.request(server)
      //             .get("/checkBalance")
      //             .end(function(err,res){
      //               res.should.have.status(200);
      //               res.should.be.json;
      //               res.body[0].balance.should.equal((parseInt(money.toString()) - 200).toString());
      //               done();
      //             })
      //         })
      //     })
      // });
      it('Transfer', done => {
        var moneySender;
        chai.request(server)
          .post("/checkBalance")
          .send({'id':55})
          .end(function(err,res){
            moneySender = res.body[0].balance;
            chai.request(server)
              .post("/Transfer")
              .send({'value':200,'idSender':55,'idReceiver':54})
              .end(function(err,res){
                    chai.request(server)
                      .post("/getHistory")
                      .send({'id':55})
                      .end(function(err,res){
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.length.should.equal(2);
                        res.body.should.be.array;
                        res.body[0].should.have.property('card_id');
                        res.body[0].should.have.property('name');
                        res.body[0].should.have.property('transaction_date');
                        res.body[0].should.have.property('description');
                        res.body[0].should.have.property('balance_at');
                        chai.request(server)
                          .post("/checkBalance")
                          .send({'id':55})
                          .end(function(err,res){
                            res.should.have.status(200);
                            res.should.be.json;
                            res.body[0].balance.should.equal('-200');
                            done();
                          });
                  });
              });
          });
      });
});
