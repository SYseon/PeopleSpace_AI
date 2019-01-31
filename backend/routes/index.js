var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var sqlconn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1q2w3e4r',
  database : 'account'
})

sqlconn.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/start', function(req, res, next)
{
  var selectquery = 'SELECT * FROM test';
  sqlconn.query(selectquery, function(err, rows)
  {
    if(err) {console.log(err);}
    else
    {
      for(var i in rows)
      {
        if(rows[i].username == "ms") {console.log(i);}
      }
      console.log(rows);
    }
  });
  res.send("start page");
});
router.get('/*', function(req, res)
{
  res.send('This is undefined page');
});

module.exports = router;
