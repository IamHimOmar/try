var port = 8000,
    express = require('express'),
    parser = require('body-parser'),
    router = require('./src/api/index.js'),
    app = express();


app.use(express.static('public'));
app.use(express.static('app'));
app.use(express.static('bower_components'));
app.use(express.static('src/api'));
// app.use(express.static(__dirname + '/public'));
app.use(parser.json());
app.use('/',router);

app.listen(port);
console.log('Now serving http://localhost:'+port+'/index.html');

module.exports = app;
