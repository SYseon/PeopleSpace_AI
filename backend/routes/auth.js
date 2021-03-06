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
  //res.send('login page');
  res.render('login');
});
router.post('/login', function(req, res, next)  // POST login page
{
  var selectQuery = 'SELECT * FROM dbtest'; // This will be changed to real table name
  // Get input account data from web
  var inputID = req.body.accountId; // change to "inputID = req.body.accountId";
  var inputPW = req.body.accountPassword; // change to "inputPW = req.body.accountPassword";
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
          var accountData = rows[i];
          hasher({password: inputPW, salt: rows[i].salt}, function(err, pass, salt, hash)
          {
            if(hash == accountData.accountPassword) // Login success
            {
              console.log('login success');
              req.session.bIsLogined = true;
              req.session.loginAccount = inputID;
              res.redirect('/');
            }
            else {console.log('login failure'); res.redirect('/auth/login');}
          });
        }
      }
    }
  });
});

/** Logout page */
router.get('/logout', function(req, res)
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  res.render('logout');
});
router.post('/logout', function(req, res)
{
  // Access control
  if(!req.session.bIsLogined)
  {
    res.redirect('/');
    return false;
  }
  delete req.session.bIsLogined;
  delete req.session.loginAccount;
  req.session.save(function() {res.redirect('/');})
});

/** Register Page */
router.get('/register', function(req, res, next)  // GET register page
{
  //path.join(__dirname, '../public', 'index.html');
  res.render('register');
});
router.post('/register', function(req, res, next) // POST register page
{
  var inputID = req.body.accountId; // change to inputID = req.body.accountId;
  var inputPW = req.body.accountPassword; // change to inputPW = req.body.accountPassword;
  var selectQuery = 'SELECT * FROM dbtest';
  var insertQuery = 'INSERT INTO dbtest (accountId, accountPassword, salt) VALUES(?, ?, ?)'; // This will be changed to real table name
  // checking if there's no same name user
  sqlconn.query(selectQuery, function(err, rows, fields)
  {
    hasher({password: inputPW}, function(err, pass, salt, hash)
    {
      var insertData = [inputID, hash, salt];
      sqlconn.query(insertQuery, insertData, function(err, result, fields)
      {
        if(err) {console.log(err), res.status(500).send('Internal Server Error - Register');} // if there is the same Id in db
        else {res.send(`register complete!<a href= '/login'>login</a>`);}
      });
    });
  });
});

module.exports = router;