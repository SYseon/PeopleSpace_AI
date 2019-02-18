var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
var multer = require('multer');
var fs = require('fs');

var path = require('path');
var upload = multer({dest: 'uploads/'});
router.use(bodyParser.urlencoded({extended: false}));

// get result from model and search data
var resultFile;
var resultData = ['totalreviews'];

/** ElasticSearch test */
var client = new elasticsearch.Client({
  host: 'https://search-entity-vq4u4jfn4vzumcvld7xprjldzu.us-east-1.es.amazonaws.com',
  log: 'trace'
});

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
    //res.redirect('/');
    //return false;
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
  console.log('summary page');
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/summary', function(req, res, next) // POST summary page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    //res.redirect('/');
    //return false;
  }

  /** Send submitted file to models *
  var spawn = require("child_process").spawn;
  var process = spawn('python', ['./testmodel.py', currentPath+'\\'+datafile]);
  process.stdout.on('data', function(data){
    console.log('data: '+data);
  });
  */
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

// recieve result data from model
router.post('/summary/getmodelresult', function(req, res)
{
  resultFile = req.body;
  console.log('get data from model');
  client.bulk({
    body: resultFile
  }, function(err, bulkres, status)
  {
    if(err) {console.log('resultFile put error!'), console.log(err);}
    else  
    {
      client.search({
        index: 'entity',
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
            },
            keywordSummary: {
              terms: {
                field: 'keyword',
                order: {_count: 'desc'}
              }
            }
          }
        }
      }).then((searchres) => {
        /** send data to frontend */
        var maxkeywordNumber = 10;
        var dataList = ['sentimentSummary', 'emotionSummary', 'intentSummary'];  // to get empty data
        dataList['sentimentSummary'] = ['positive', 'neutral', 'negative'];
        dataList['emotionSummary'] = ['happy', 'angry', 'excited', 'sad', 'bored', 'afraid', 'disgust'];
        dataList['intentSummary'] = ['sapm', 'question', 'complaint', 'suggestion', 'compliment'];
        // create json file to send to frontend
        for(var i in searchres.aggregations)
        {
          resultData.push(i);
          if(i == 'keywordSummary')
          {
            resultData[i] = [];
            for(var i2 in searchres.aggregations[i].buckets)
            {
              if(i2 > maxkeywordNumber-1) {break;}  // Maximum
              resultData[i].push(searchres.aggregations[i].buckets[i2].key);
            }
          }
          else
          {
            resultData[i] = '{';
            for(var i2 in searchres.aggregations[i].buckets)
            {
              var tempResult = searchres.aggregations[i].buckets;
              resultData[i] += '"'+tempResult[i2].key+'": '+ tempResult[i2].doc_count+', ';
              dataList[i].splice(tempResult[i2].key, 1);
            }
            // get empty data
            for(var listIndex in dataList[i])
            {
              resultData[i] += '"'+dataList[i][listIndex]+'": '+ 0 +', ';
            }
            resultData[i] = resultData[i].slice(0, -2);
            resultData[i] += '}';
            resultData[i] = JSON.parse(resultData[i]);
            //console.log(resultData[i]);
          }
        }
        resultData['totalreviews'] = searchres.hits.total;
        
        console.log(resultData);
        res.redirect('/summary');
      });
    }
  });
});

router.post('/summary/getresult', function(req, res)
{
  // send data to frontend
  res.json({
    totalreviews: resultData['totalreviews'],
    sentiment: resultData['sentimentSummary'],
    emotion: resultData['emotionSummary'],
    intent: resultData['intentSummary'],
    keywordCloud: resultData['keywordSummary']
  });
});

module.exports = router;