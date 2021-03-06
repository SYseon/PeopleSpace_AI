var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

/** ElasticSearch test */
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
var resultFile = require('../result_test.json');

/** Home Page */
router.get(['/', '/start', '/welcome'], function(req, res, next) {
  if(req.session.bIsLogined) // login already
  {
    res.render('welcome', { title: req.session.loginAccount });
  }
  else
  {
    //res.send('<h1>you should login</h1>');
    /** pug test */
    res.render('index', {title : 'you should login first'});
  }
  //path.join(__dirname, '../public', 'index.html');
});

/** Search & Result Page */
router.get('/search', function(req, res, next)  // GET search page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  //path.join(__dirname, '../public', 'index.html');
  res.send('search page');
});
router.post('/search', function(req, res, next) // POST search page
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  /** Get submitted file */
  //var submittedFile = req.body.submitted;

  /** Send submitted file to models */

  /** Recieve and store result file */
  client.create({
    index: 'entity',
    type: 'review',
    id: '2',
    body: resultFile
  }, function(err, response, status)
  {
    if(err) {console.log('resultFile put error!'), console.log(err);}
    else
    {
      console.log('==Response==');
      console.log(response);
      console.log('==Status==');
      console.log(status);
    }
  });
   
  /** Search data thru elastic search */
  var searchData = 'mskim'; // change to searchData = req.query.searchData;
  const response = client.search({
    index: 'entity',
    q: `reviewID:${searchData}`
  });

  /** Show result data */
});

/** Python test *
router.get('/pythontest', function(req, res)
{
  // using spawn instead of exec, prefer a stream over a buffer
  // to avoid maxBuffer issue
  var spawn = require("child_process").spawn;
  var process = spawn('python', ['./compute_input.py']);
  var data = [100, 10, 100, 1000];
  var dataString = '';
  process.stdout.on('data', function(data){
    dataString += data.toString();
  });
  process.stdout.on('end', function(){
    console.log('Sum of numbers=', dataString);
  });
  process.stdin.write(JSON.stringify(data));
  process.stdin.end();
  res.send(data);
  console.log(process);
});
*/

module.exports = router;