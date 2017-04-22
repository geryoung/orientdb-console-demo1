
var ODatabase = require('orientjs').ODatabase;
var db = new ODatabase({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'hello',
  name: 'test2'
});

db.open()
  .then(function () {

    var t = db
      .select()
      .from('Person') //Friend 
      .all()
      .then(function (select) {
        console.log('Hitters:', select);


      });
  })
  .catch(function (err) {
    console.log(err);
  });
