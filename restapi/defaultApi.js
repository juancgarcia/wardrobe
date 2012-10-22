/*
    TODO:
        nothing
*/
var defaultConfig = {
    /*
        include leading slash, but not trailing
        Ex: '/api'
    */
    //prefix: '',
    /*
        include leading slash, but not trailing
        Ex: '/articles'
    */
    //resource: '',
};

defaultConfig.actions = [
    {
        'verb': 'get',
        'uri':'/',
        'method': function(resourceFacade){return function(req, res){
            return resourceFacade.model.find(function(err, items){
                return res.send(items);
            });
        }; }
    },
    {
        'verb': 'get',
        'uri':'/:id',
        'method': function(resourceFacade){return function(req, res){
            return resourceFacade.model.findById(req.params.id, function(err, item){
                if(!err) {
                    return res.send(item);
                }
            });
        }; }
    },
    {
        'verb': 'post',
        'uri':'/',
        'method': function(resourceFacade){return function(req, res){
            var item, itemConfig = {};
            for(var attr in req.body){
                itemConfig[attr] = req.body[attr];
            }
            item = new resourceFacade.model(itemConfig);
            item.save(function(err) {
                if (!err) {
                  return console.log("created");
                }
            });
            return res.send(item);
        }; }
    },
    {
        'verb': 'put',
        'uri':'/:id',
        'method': function(resourceFacade){return function(req, res){
            return resourceFacade.model.findById(req.params.id, function(err, item) {
                /*
                    Consider using resourceFacade.schema as a means to filter attributes of req.body
                */
                for(var attr in req.body){
                    item[attr] = req.body[attr];
                }
                return item.save(function(err) {
                    if (!err) {
                        console.log("updated");
                    }
                    return res.send(item);
                });
            });
        }; }
    },
    {
        'verb': 'del',
        'uri':'/:id',
        'method': function(resourceFacade){return function(req, res){
            return resourceFacade.model.findById(req.params.id, function(err, item){
                return item.remove(function(err){
                    if(!err) {
                        console.log("removed");
                        return res.send('');
                    }
                });
            });
        }; }
    }
];

module.exports = defaultConfig;