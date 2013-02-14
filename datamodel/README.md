#Datamodel definition
###Mongoose (MongoDB)

New models are defined in separate files and added to the project by requiring them
into the export of index.js

Format models using the following structure:

    module.exports = function(mongoose){
        var myModel = {};
        
        myModel.schema = new mongoose.Schema({
            name: String
        });    
        
        myModel.schema.methods.doThatThing = function () {
            var title = this.name ?
                "MyModel's name is " + this.name :
                "MyModel has no name";
            console.log(title);
        };
        
        myModel.model = mongoose.model('MyModel', myModel.schema);    
        
        myModel.methods = {};
        myModel.methods.findById = function(req, res) {
            var id = req.params.id;
            console.log('Retrieving myModel: ' + id);
            myModel.model.find({id: id}, function(err, collection) {
                if(err){
                  console.log('error finding by id: '+ JSON.stringify(err));
                }
                res.send(collection);
            });
        };
        
        return myModel;
    }