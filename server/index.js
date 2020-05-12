const http = require('http');
const httpProxy = require('http-proxy');
const middle = require('http-proxy-middleware');
const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const cors = require('cors');

let prox = httpProxy.createProxyServer();

app.use('/:listingId', express.static(path.join(__dirname, '../public')));


app.all('/reservation/*', cors(), function(req, res) {
    console.log('reserve')
    prox.web(req, res, {target: 'http://localhost:3007/'});
});

app.all('/reviews/*', cors(), function(req, res) {
    //console.log('review')
    prox.web(req, res, {target: 'http://localhost:4007/'});
});

app.all('/photos/*', cors(), function(req, res) {
    //console.log('photos')
    prox.web(req, res, {target: 'http://localhost:3002/'});
});

app.all('/description/*', cors(), function(req, res) {
    //console.log('describe')
    prox.web(req, res, {target: 'http://localhost:3001/'});
});


app.listen(8000);
console.log(`listening on ${port}`);