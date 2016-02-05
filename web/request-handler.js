var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var utils = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

var actions = {
  "GET": function(req, res){ 
  var parts = urlParser.parse(req.url)
  var urlPath;
  if (parts.pathname === "/"){
    urlPath = "/index.html";
  }else{
    urlPath = parts.pathname;
  }
  
  utils.serveAssets(res, urlPath);
  
  
  // parts.pathname
    // res.end(archive.paths.list);
  },
  "POST": function(req, res){
    req.on("data", function(data){
      var parsed = JSON.parse(data);
      archive.addUrlToList(parsed.url, function(found){
        utils.sendResponse(res, found, 302);
      });

    })
   
    
    
  }
};



exports.handleRequest = function (req, res) {
    console.log(req.method);
    var action = actions[req.method]  
    if(action){
      action(req, res);
    }else{
      utils.sendResponse(res, "Not Found", 404)
    }
};


