var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
var multer = require('multer');
var fs = require('fs');

var path = require('path');
var upload = multer({dest: 'uploads/'});
router.use(bodyParser.urlencoded({extended: false}));

/** ElasticSearch test */
var client = new elasticsearch.Client({
  host: 'https://search-entity-vq4u4jfn4vzumcvld7xprjldzu.us-east-1.es.amazonaws.com',
  log: 'trace'
});
var resultFile = require('../result_test.json');

/** Home Page */
router.get(['/', '/start'], function(req, res, next) {
  if(req.session.bIsLogined) // login already
  {
    res.redirect('/dashboard');
  }
  else
  {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  }
});
router.get('/dashboard', function(req, res, next)
{
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

/** Search & Result Page */
router.get('/summary', function(req, res, next)  // GET summary page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    //res.redirect('/');
    //return false;
  }
  res.sendFile(path.join(__dirname, '../public', 'index.html'));

  // test
  client.bulk({
    body: resultFile
  }, function(err, bulkres, status)
  {
    if(err) {console.log('resultFile put error!'), console.log(err);}
    else
    {
      client.search({
        index: 'entity',
        //q: `reviewID:${searchData}`
        body: {
          size: 0,
          aggregations: {
            sentimentSummary: {
              terms: {
                field: 'summary.sentiment',
                order: {_count: 'desc'}  // to get max data as [0]
              }
            },
            emotionSummary: {
              terms: {
                field: 'summary.emotion',
                order: {_count: 'desc'}  // to get max data as [0]
              }
            },
            intentSummary: {
              terms: {
                field: 'summary.intent',
                order: {_count: 'desc'}  // to get max data as [0]
              }
            }
          }
        }
      }).then((searchres) => {
        console.log(searchres.hits.total);
        // print summary data
        for(var i in searchres.aggregations)
        {
          console.log('i: '+ i + ' / ' + searchres.aggregations[i].buckets[0].key);
        }
      });
    }
  });
});

router.post('/summary', function(req, res, next) // POST summary page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  // Get submitted file
  var submittedFile = req.body.submittedFile;
  console.log(submittedFile);

  /** Send submitted file to models *
  var spawn = require("child_process").spawn;
  var process = spawn('python', ['./testmodel.py', currentPath+'\\'+datafile]);
  process.stdout.on('data', function(data){
    console.log('data: '+data);
  });
  /

  /** Recieve and store result file *
  client.bulk({
    body: resultFile
  }, function(err, response, status)
  {
    if(err) {console.log('resultFile put error!'), console.log(err);}
    else
    {
      console.log('==Response==');
      console.log(response);
      // Search data thru elastic search
      client.search({
        index: 'entity',
        //q: `reviewID:${searchData}`
        body: {
          size: 0,
          aggregations: {
            summary: {
              terms: {
                field: 'summary.emotion'
              }
            }
          }
        }
      }).then((response) => {
        console.log(response.hits.total);
      });
    }
  });

  /** Show result data */
});
router.get('/search', function(req, res, next)  // GET search page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/single-file', upload.single('file'), function(req, res, next)
{
  // get new file
  var data = req.file;
  res.send('');

  // remove previous file
  var currentPath = path.join(__dirname, '../uploads');
  fs.readdir(currentPath, function(err, files)
  {
    if(err) {console.log(err);}
    else
    {
      for(var i in files)
      {
        if(files[i] != data.filename)// except current file
        {
          fs.unlink(currentPath+'\\'+files[i], function(err)
          {
            if(err) {console.log(err);}
            else {console.log('succesfully deleted!');}
          });
        }
      }
    }
  });
});

/** Python test */
router.get('/pythontest', function(req, res)
{
  var currentPath = path.join(__dirname, '../uploads');
  fs.readdir(currentPath, function(err, files)
  {
    var datafile;
    if(err) {console.log(err);}
    else
    {
      datafile = files[0];
    }
    
    // send file to model
    var spawn = require("child_process").spawn;
    var process = spawn('python', ['./testmodel.py', currentPath+'\\'+datafile]);
    process.stdout.on('data', function(data){
      console.log('data: '+data);
    });
    process.stdout.on('end', function(){
      //console.log('Sum of numbers=', dataString);
    });
    process.stdin.end();
    //res.send('');
  });
});

// recieve result data from model
router.post('/pythonpost', function(req, res)
{
  console.log(req.body);
});

module.exports = router;