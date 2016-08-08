const bank = require('./bank');
var b = bank.bankinit()

var express = require('express');
var router = express.Router();


router.post("/deposite",b.Deposite);
router.post("/withdraw",b.Withdraw);
router.post("/checkBalance",b.CheckBalance);
router.post("/transfer",b.Transfer);
router.post("/connect",b.connectUser);
router.post("/getHistory",b.getHistory);

module.exports = router;
