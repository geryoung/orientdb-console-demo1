
var ODatabase = require('orientjs').ODatabase;
var db = new ODatabase({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'hello',
  name: 'test2'
});

var sql = '';
//sql = 'DELETE EDGE Friend WHERE 1=1'; //删除所有 Friend 边
sql = 'SELECT from FRIEND';
//sql = 'SELECT from Person'; 


db.open()
  .then(function () {

    var t = db.query(sql)
      .then(function (res) {
        console.log('sql result: ' + JSON.stringify(res, null, ' '));
      })
      .catch(function (err) {
        console.log(err);
      });
  })
  .catch(function (err) {
    console.log(err);
  });
