/*
    Usage:
    var article = require('./datamodel/article')(mongoose);
*/

module.exports = function(mongoose){
    var article = {};
    
    article.schema = new mongoose.Schema({
        name: String
    });    
    
    article.schema.methods.wear = function () {
        var title = this.name ?
            "Article's name is " + this.name :
            "Article has no name";
        console.log(title);
    };
    
    article.model = mongoose.model('Article', article.schema);    
    
    article.methods = {};
    article.methods.findById = function(req, res) {
        var id = req.params.id;
        console.log('Retrieving article: ' + id);
        article.model.find({id: id}, function(err, collection) {
            if(err){
              console.log('error finding by id: '+ JSON.stringify(err));
            }
            res.send(collection);
        });
    };
    
    return article;
}