var Extend = require('../Extend');
var defaultApi = require('./defaultApi');

var articleConfig = Extend({
    /*include leading slash, but not trailing*/
    prefix: '/api',
    
    /*include leading slash, but not trailing*/
    resource: '/articles'
    
},defaultApi);

module.exports = articleConfig;