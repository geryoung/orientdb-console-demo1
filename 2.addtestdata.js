
var ODatabase = require('orientjs').ODatabase;
var db = new ODatabase({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'hello',
    name: 'test2'
});


db.open().then(function () {

    return db.insert().into('Player')
        .set({
            ba: 0.367,
            r: 2246,
            rbi: 1938
        }).where(name = "Ty Cobb").one();
}).then(function (player) {
    console.log(player)
});
