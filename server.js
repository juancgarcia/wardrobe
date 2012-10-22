var express = require('express'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    config = require('./private'),
    datamodel = require('./datamodel/')(mongoose),
    port = process.env.PORT || 3000,
    app = express();

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
require('./restapi/').insert(app, datamodel);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});