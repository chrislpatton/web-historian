var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // if (asset === "/index.html")  
  //   asset = archive.paths.siteAssets + assets;
  // }
  var status = 200;
  fs.readFile(archive.paths.siteAssets + asset, function(error, data){
    console.log(asset);
    if (error){
        fs.readFile(archive.paths.archivedSites + asset, function(error, data){
          if (error){
            sendResponse(res, "File Not Found", 404);
          }
          sendResponse(res, data, status);
        })
    }else{
      sendResponse(res, data, status);
    }
    
  })

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

  var sendResponse = function(res, message, statusCode){
  var statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(message);
}


exports.redirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};

exports.postData = function(request, callback){
    var data = "";
    request.on('data', function(chunk){
      data += chunk;
    });
    
    request.on('end', function(){
      callback(data);
    });
  };


// As you progress, keep thinking about what helper functions you can put here!
