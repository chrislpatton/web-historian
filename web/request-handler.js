var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var utils = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!


var actions = {
  "GET": function(req, res){ 
  var parts = urlParser.parse(req.url);
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
    // req.on("data", function(data){
    //   console.log("on data");
    //   var parsed = JSON.parse(data);
      utils.postData(req, function(data){
        var url = data.split("=")[1];
        archive.isUrlInList(data, function(found){
         if (found){
           // it's achieved
           archive.isUrlArchived(url, function(found){
            if (found){
              utils.serveAssets(res, "/" + url);
            }else{
              utils.redirect(res, "/loading.html");  
            }
           }); 
           utils.serveAssets(res, "/index.html");
        }else{
          archive.addUrlToList(url, function(){
           utils.redirect(res, "/loading.html");  
          });
          
   
         }
       });
  
      }); 
      
    }
   
    //is site in sites.txt
      // if yes
      //is it archived
      //if yes
      //display page
      //if no
      //diplay loading.html
      //&& append to sites.txt
    
  
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


