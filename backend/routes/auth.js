var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var bkfd2Password = require('pbkdf2-password');
var hasher = bkfd2Password();

router.use(bodyParser.urlencoded({extended: false}));

/** MySQL */
var sqlconn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '1q2w3e4r',
  database : 'account'
});
sqlconn.connect();

/** redirect to login */
router.get('/', function(req, res, next) {
  res.redirect('/auth/login');
});

/** Login Page */
router.get('/login', function(req, res, next) // GET login page
{
  //path.join(__dirname, '../public', 'index.html');
  res.send('login page');
});
router.post('/login', function(req, res, next)  // POST login page
{
  var selectQuery = 'SELECT * FROM dbtest'; // This will be changed to real table name
  // Get input account data from web
  var inputID = "testID"; // change to "inputID = req.body.username";
  var inputPW = "testPW"; // change to "inputPW = req.body.password";
  // Login
  sqlconn.query(selectQuery, function(err, rows, fields)
  {
    if(err) {console.log(err);}
    else
    {
      // check ID & PW for login
      for(var i in rows)
      {
        if(inputID == rows[i].accountId)
        {
          hasher({password: inputPW, salt: rows[i].salt}, function(err, pass, salt, hash)
          {
            if(hash == rows[i].accountPassword) // Login success
            {
              console.log('login success');
              req.session.bIsLogined = true;
              res.redirect('/');
            }
            else {console.log('login failure');}
          });
        }
      }
    }
  });
  res.send('login page'); // delete this later
});

/** Logout page */
router.get('/logout', function(req, res)
{
  delete req.session.bIsLogined;
  req.session.save(function() {res.redirect('/');})
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
  var selectQuery = 'SELECT * FROM dbtest';
  var insertQuery = 'INSERT INTO dbtest (accountId, accountPassword, salt) VALUES(?, ?, ?)'; // This will be changed to real table name
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
      hasher({password: inputPW}, function(err, pass, salt, hash)
      {        
        sqlconn.query(insertQuery, [inputID, hash, salt], function(err, result, fields)
        {
          if(err) {console.log(err), res.status(500).send('Internal Server Error - Register');}
          else {res.send(`register complete!<a href= '/login'>login</a>`);}
        });
      });
    }
  });
});

module.exports = router;