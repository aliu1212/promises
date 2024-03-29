/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */ 

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = function(user) {
  return new Promise ((resolve, reject) => {
    getGitHubProfile(user, (error, data)=>{
      if (error){
        reject(error);
      } else {
        // console.log('this is the data from getAsyc --> ', data);
        resolve(data);
      }
    });
  });
}
  


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = (callback) => {
  return new Promise((resolve, reject)=>{
    generateRandomToken((error, buffer)=>{
      if (error) {
        reject(error);
      } else {
        resolve(buffer + '');
      }
    });
  });
};


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }
   
    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(null, funnyFile);
  });
};

var readFileAndMakeItFunnyAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    readFileAndMakeItFunny(filePath, (error, file)=>{
      if (error) {
        reject(error);
      } else {
        resolve(file);
      }
    })
  })
}

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  getGitHubProfile: getGitHubProfile,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
