// Borrowed from Peteris Krumins: http://www.catonmat.net/http-proxy-in-nodejs/

//location.href = "data:img/png;," + atob( zipdata );

// example usage:
// http://wardrobe_me.juancgarcia.c9.io/ipsumImgProxy?color=0055cc

var http = require('http'),
    url = require('url'),
    moduleName = 'ImgProxy',
    cacheFreshnessInMinutes = 60,
    matchPath = '/ipsumImgProxy',
    domain = 'ipsumimage.appspot.com',
    pathPattern = '/SIZE,COLOR?s=FONTSIZE&f=FONTCOLOR&l=TEXT|NUMBER';

if(require.main === module){
    
    console.log('['+moduleName+'] Loaded as standalone');
    
    http.createServer( function(request, response){
        var parsedUrl = url.parse(request.url, true);
        if( parsedUrl.pathname !== matchPath){
            response.writeHead(404, 'not found');
            response.end();
        }
        else
            fetchViaProxy(request, response);        
    }).listen(process.env.PORT, process.env.IP);

    console.log('['+moduleName+'] IP: '+process.env.IP);
    console.log('['+moduleName+'] Port: '+process.env.PORT);
} else {
    //http://wardrobe_me.juancgarcia.c9.io/ipsumImgProxy?size=200&text=foo&number=001&color=af3d33
    console.log('['+moduleName+'] Loaded as module');
}

function fetchViaProxy(request, response){
    var defaults = {
        size:       '200x200',
        color:      'ff0077',
        fontColor:  '7700ff',
        fontSize:   '30',
        text:       'foobar',
        number:     '42'
    };
    
    /*parse out client request vars*/
    var inputs = url.parse(request.url, true).query;    
    var remotePath = buildRemotePath(defaults, inputs, pathPattern);
    
    var proxy_request = http.request({
            port: 80,
            hostname: domain,
            method: 'GET',
            path: remotePath
        },function(){/*callback*/});
        
    proxy_request.on('response', function (proxy_response) {
        proxy_response.on('data', function(chunk) {
            response.write(chunk, 'binary');
        });
        proxy_response.on('end', function() {
            response.end();
        });
        
        proxy_response.headers['cache-control'] = 'private, max-age=' + (cacheFreshnessInMinutes * 60);
        response.writeHead(proxy_response.statusCode, proxy_response.headers);
    });
    
    request.on('data', function(chunk) {
        proxy_request.write(chunk, 'binary');
    });    
    
    request.on('end', function() {
        proxy_request.end();
    });
}

function buildRemotePath(defaults, inputs, pathPattern){
    var params = {};
    
    for(var key in defaults){
        params[key] = inputs[key] || defaults[key];
    }
    
    var remotePath = pathPattern;
    remotePath = remotePath.replace('FONTSIZE', params.fontSize);
    remotePath = remotePath.replace('FONTCOLOR', params.fontColor);
    remotePath = remotePath.replace('SIZE', params.size);
    remotePath = remotePath.replace('COLOR', params.color);
    remotePath = remotePath.replace('TEXT', params.text);
    remotePath = remotePath.replace('NUMBER', params.number); 
    
    return remotePath;
}

module.exports = fetchViaProxy;