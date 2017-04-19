var ODatabase = require('orientjs').ODatabase;
var db = new ODatabase({
   host:     'localhost',
   port:     2424,
   username: 'root',
   password: 'hello',
   name:     'test2'
});


db.open().then(function() {

    //return  db.class.create('Person', 'V');
    // var F = db.class.create('Friend', 'E');
    // return db.query('SELECT FROM V LIMIT 1');

    return db.class.list();
//    .then(
//       function(classes){
//          console.log('There are ' 
//          + classes.length 
//          + ' classes in the db:',
//          classes);
//       }
//    );


}).then(function(res){
   //console.log(res.length);
   db.close().then(function(){
      console.log('closed');
   });
});
