var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var elasticsearch = require('elasticsearch');

/** MySQL */
var sqlconn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1q2w3e4r',
  database : 'account'
});
sqlconn.connect();

/** ElasticSearch test *
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 3000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
*/

/** Home Page */
router.get(['/', '/start'], function(req, res, next) {
  res.render('index', { title: 'Express' });
  //path.join(__dirname, '../public', 'index.html');
});

/** Login Page */
router.get('/login', function(req, res, next) // GET login page
{
  //path.join(__dirname, '../public', 'index.html');
  res.send('login page');
});
router.post('/login', function(req, res, next)  // POST login page
{
  var selectQuery = 'SELECT * FROM test'; // This will be changed to real table name
  // Get input account data from web
  var inputID = "testID"; // change to "inputID = req.body.username";
  var inputPW = "testPW"; // change to "inputPW = req.body.password";
  var bIsValidID = false;
  // Login
  sqlconn.query(selectQuery, function(err, rows, fields)
  {
    if(err) {console.log(err);}
    else
    {
      // check ID & PW for login
      for(var i in rows)
      {
        if(inputID == rows[i].username && inputPW == rows[i].userpassword) {bIsValidID = true;}
      }
      console.log(rows);
      // When Login Successed
      if(bIsValidID)
      {
        console.log('login success');
      }
      else  // Login Failed
      {
        console.log('login failure');
      }
    }
  });
  res.send('login page');
});

/** Register Page */
router.get('/register', function(req, res, next)  // GET register page
{
  //path.join(__dirname, '../public', 'index.html');
  res.send("register page");
});
router.post('/register', function(req, res, next) // POST register page
{
  var inputID = "testID"; // change to inputID = req.body.username;
  var inputPW = "testPW"; // change to inputPW = req.body.password;
  var selectQuery = 'SELECT * FROM test';
  var insertQuery = 'INSERT INTO test (username, userpassword) VALUES(?, ?)'; // This will be changed to real table name
  // checking if there's no same name user
  sqlconn.query(selectQuery, function(err, rows, fields)
  {
    var bIsUniqueID = true;
    for(var i in rows)
    {
      if(inputID == rows[i].username) {bIsUniqueID = false; break;}
    }
    // if there's no same user
    if(bIsUniqueID)
    {
      console.log('there is no same user');
      /*
      sqlconn.query(insertQuery, [inputID, inputPW], function(err, result, fields)
      {
        if(err) {console.log(err), res.status(500).send('Internal Server Error - Register');}
        else {}
      });
      */
    }
  });
});

/** Search & Result Page */
router.get('/search', function(req, res, next)  // GET search page
{
  // search data thru elastic search
  //path.join(__dirname, '../public', 'index.html');
  res.send('search page');
});

/** undefined routing handling */
router.get('/*', function(req, res)
{
  res.send('This is undefined page');
});

module.exports = router;
