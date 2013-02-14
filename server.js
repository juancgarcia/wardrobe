var express = require('express'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    config = require('./private'),
    datamodel = require('./datamodel/')(mongoose),
    port = process.env.PORT || 3000,
    app = express(),
    moduleName = 'Wardrobe.me';

// general and webserver
app.configure(function(){
    app.set('port', port);//mod
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));//mod
});

//DB
mongoose.connect(config.creds.mongoose_auth);

// REST API config
//refactor APIs to use base url: /api/version/...
require('./restapi/').insert(app, datamodel);

//add web routes

// ipsumImgProxy
app.get('/ipsumImgProxy', require('./imgProxy'));

http.createServer(app).listen(app.get('port'), function(){
    console.log('['+moduleName+'] Express server listening on port ' + app.get('port'));
});