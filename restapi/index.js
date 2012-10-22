/* TODO: nothing */

var apiDefinition = {
    'article': require('./article')
};

//console.log('API Def: ' + JSON.stringify(apiDefinition));

/*
    insert API's for all resources referenced in apiDefinition
*/
function insert(expressApp, dataModel){
    for(var resourceName in apiDefinition){
        addResource({
            expressApp:     expressApp,
            dataModel:      dataModel,
            resourceName:   resourceName,
            resourceConfig: apiDefinition[resourceName]
        });
    }
}

/*
    Add REST API actions for the specified resource
*/
function addResource(config){    
    var expressApp = config.expressApp,
        dataModel = config.dataModel,
        resourceName = config.resourceName,
        resourceConfig = config.resourceConfig;
    
    for(var action in resourceConfig.actions){
        addResourceAction({
            action:         resourceConfig.actions[action],
            apiConfig:      resourceConfig,
            expressApp:     expressApp,
            resourceFacade: dataModel[resourceName]
        });
    }
}

/*
    Add the specified action to the expressJS application
*/
function addResourceAction(config){
    var action = config.action,
        verb = action.verb,
        apiConfig = config.apiConfig,
        expressApp = config.expressApp,
        resourceFacade = config.resourceFacade;
        
        //console.log('action: ' + JSON.stringify(action));
    
    var uri =   (apiConfig.prefix || '') +
                (apiConfig.resource || '') +
                action.uri;
    var method = action.method(resourceFacade);
    expressApp[verb]( uri, method);
}

exports.insert = insert;