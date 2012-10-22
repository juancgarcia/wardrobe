/*
    var models = require('./datamodel')(mongoose);
*/

module.exports = function(mongoose){    
    return {
        'article': require('./article')(mongoose)
    };
};