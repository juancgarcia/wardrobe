/*
    Usage:
    var article = require('./datamodel/article')(mongoose);
*/

var metaBase = require('../public/js/datamodel/article');

module.exports = function(mongoose){
    var article = {};
    
    article.schema = new mongoose.Schema({
        name: String,
        color: String
    });    
    
    article.schema.methods.wear = function () {
        var title = this.name ?
            "Article's name is " + this.name :
            "Article has no name";
        console.log(title);
    };
    
    article.model = mongoose.model('Article', article.schema);
    
    return article;
}