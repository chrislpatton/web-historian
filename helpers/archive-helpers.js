var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var utils = require("../web/http-helpers");
var request = require("request");

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var output;
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    if (err){
      console.log("error");
    }
   callback(data.split('\n'));
 });
  
};

exports.isUrlInList = function(data, callback){
  var found;
  exports.readListOfUrls(function(list){
    found = _.contains(list, data)
  })
  callback(found);
};

exports.addUrlToList = function(url, callback){
  
  fs.appendFile(exports.paths.list, url + "\n", function(err){
    if (err){
      console.log(err);
    }
   callback();
  });
};

exports.isUrlArchived = function(data, callback){
  //fs.ReadFile(exports.path.archivedSites, )
  
  fs.exists(exports.paths.archivedSites + data, function(found){
    callback(found);
  })
};

exports.downloadUrls = function(urlArray){
  console.log("here");
  console.log(urlArray);
  urlArray.forEach(function(url){
    console.log("here2");
    var fullUrl = "http://" + url;
    console.log(fullUrl);
    request(fullUrl).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url)).on("error", function(error){console.log(error);});
       
  })
};
