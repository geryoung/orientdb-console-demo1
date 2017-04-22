

var ODatabase = require('orientjs').ODatabase;
///*

var db = new ODatabase({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'hello',
  name: 'test2'
});


var sql1 = 'MATCH {class:Person, as:person, where: (name= "John" AND surename="Doe")}.both("Friend").both("Friend")' +
  '{as: friendOfFriend} RETURN person, friendOfFriend'; //

var sql2 = 'MATCH {class:Person, as:person, where: (name= "John" AND surename="Doe")}.both("Friend")' +
  '{as: friendOfFriend} RETURN person, friendOfFriend'; //

db.open()
  .then(function () {

    var t = db.query(sql1)
      .then(function (res1) {
        console.log('sql res1ult: ' + res1);

        db.query(sql2)
          .then(function (res2) {
            console.log('sql res1ult: ' + res1);
            console.log('sql res2ult: ' + res2);
            debugger;
          })
          .catch(function (err) {
            console.log(err);
          });

      })
      .catch(function (err) {
        console.log(err);
      });


  })
  .catch(function (err) {
    console.log(err);
  });
//*/

/*
var ODatabase = require('orientjs').ODatabase;
var query = function (_sql, callback) {

  var _db = new ODatabase({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'hello',
    name: 'test2'
  });
  _db.open()
    .then(function () {

      var t = _db.query(_sql)
        .then(function (_res1) {
          callback(null, _res1);

        })
        .catch(function (err) {
          callback(err);
        });


    })
    .catch(function (err) {
      callback(err);
    });
};


var sql1 = 'MATCH {class:Person, as:person, where: (name= "John" AND surename="Doe")}.both("Friend").both("Friend")' +
  '{as: friendOfFriend} RETURN person, friendOfFriend'; //

var sql2 = 'MATCH {class:Person, as:person, where: (name= "John" AND surename="Doe")}.both("Friend")' +
  '{as: friendOfFriend} RETURN person, friendOfFriend'; //

query(sql1, function() {

});

*/
