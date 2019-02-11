var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'o2'
});

connection.connect();

/** select test *
var sql = 'SELECT * FROM topic';
connection.query(sql, function(err, rows, fields) {
    if(err) {
        console.log(err);
    } else {
        for(var i = 0; i < rows.length; i++)
            console.log(rows[i].description);

    }
});
*/

/** insert test *
var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
var params = ['Supervisor', 'Watcher', 'mskim'];
connection.query(sql, params, function(err, rows, fields)
{
    if(err)
        console.log(err);
    else
    {
        console.log(rows);
        console.log(rows.insertId);
    }
})
*/

/** update test *
var sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
var params = ['Superviso2r', 'ms', 2];
connection.query(sql, params, function(err, rows, fields)
{
    if(err)
        console.log(err);
    else
    {
        console.log(rows);
        console.log(rows.insertId);
    }
})
*/

/** delete test */
var sql = 'DELETE FROM topic WHERE id=?';
var params = [3];
connection.query(sql, params, function(err, rows, fields)
{
    if(err)
        console.log(err);
    else
    {
        console.log(rows);
    }
});

connection.end();