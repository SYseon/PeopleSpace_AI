var fs = require('fs');
var path = require('path');

// Remove previous file
module.exports.removePreviousFile = function(currentFileName, delPath)
{
  var delPath = '../' + delPath;
  var currentPath = path.join(__dirname, delPath);
  fs.readdir(currentPath, function(err, files)
  {
    if(err) {console.log(err);}
    else
    {
      for(var i in files)
      {
        if(files[i] != currentFileName && files[i] != 'test.json')// except current file / remove 'test.json' condition later(this is just only for test)
        {
          fs.unlink(currentPath+'/'+files[i], function(err)
          {
            if(err) {console.log(err);}
            else {console.log('succesfully deleted!');}
          });
        }
      }
    }
  });
}