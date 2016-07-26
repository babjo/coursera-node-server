var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');

var app = express();
var hostname = 'localhost';
var port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaderships', leaderRouter);

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});