/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var prmscstrctr= require('../bare_minimum/promiseConstructor');
var Promise = require('bluebird');



var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  return Promise.all(filePaths.map((filePath) => {
    return prmscstrctr.pluckFirstLineFromFileAsync(filePath)
  }))
    .then((firstLines) => {
      let newText = firstLines.join('\n');
      fs.writeFile(writePath, newText, (err) => {
        if (err) { console.log('error: ', err) }
      });
    });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};
