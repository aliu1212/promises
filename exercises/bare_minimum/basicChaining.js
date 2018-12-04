/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var prmscnstrctr = require('./promiseConstructor');
var prmsfctn = require('./promisification');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise ((resolve, reject) => {
    prmscnstrctr.pluckFirstLineFromFileAsync(readFilePath)
      .then((username)=>{
        // console.log(username);
        return prmsfctn.getGitHubProfileAsync(username);
      })
      .then((profile)=>{
        // console.log(profile);
        fs.writeFile(writeFilePath, JSON.stringify(profile), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(profile);
          }
        });
      })
      .catch((err)=>{
        console.log('huge error my bro!', err);
      });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
