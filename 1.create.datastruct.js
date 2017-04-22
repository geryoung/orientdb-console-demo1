var ODatabase = require('orientjs').ODatabase;
var db = new ODatabase({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'hello',
    name: 'test2'
});


var classList = [{
    name: 'Person',
    cls: 'V'
}, {
    name: 'Friend',
    cls: 'E'
}, {
    name: 'Friend',
    cls: 'E'
}];


/**
 * class Person V
 * class Friend E
 */

db.open().then(function () {


    //return  db.class.create('Person', 'V');
    // var F = db.class.create('Friend', 'E');
    // return db.query('SELECT FROM V LIMIT 1');

    return db.class.list()
        .then(
        function (classes) {

            var classToAddList = [];
            classes.forEach(function (odbClsObj) {
                classList.forEach(function (clsObj) {
                    if (odbClsObj.name === clsObj.name &&
                        odbClsObj.superClass === clsObj.cls) {
                        classToAddList.push(clsObj);
                    }
                });
            }, this);

            return classToAddList;
        }
        );


}).then(function (_classToAddList) {

    var taskList = [];

    if (_classToAddList && _classToAddList.forEach) {
        _classToAddList.forEach(function (clsObj) {
            taskList.push(db.class.create(clsObj.name, clsObj.cls));
        })
    }

    var task = taskList.reduce(function (preTask, currentTask) {
        return preTask
            .then(function () {
                console.log('aaa');
                return currentTask;
            })
            .catch(function () {
                return currentTask;
            });
    }, Promise.resolve());


    return task
        .then(function () {
            console.log('last------------');
        })
        .catch(function () {
            console.log('last------------err');
        });


    db.close().finally(function () {
        console.log('closed');
    });


});

db.on("beginQuery", function (obj) {
    // console.log('DEBUG: ', obj);
});
db.on("endQuery", function (obj) {
    // console.log("DEBUG: ", obj);
});

