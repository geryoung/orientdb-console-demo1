
var ODatabase = require('orientjs').ODatabase;
var db = new ODatabase({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'hello',
    name: 'test2'
});

/**
 * data:
 * 
 * 
 * 
 */

var personVList = [{ "name": "John", "surename": "Doe" },
                    { "name": "John", "surename": "Doe" },
                    { "name": "John", "surename": "Smith" },
                    { "name": "Jenny", "surename": "Smith" },
                    { "name": "Frank", "surename": "Bean" },
                    { "name": "Mark", "surename": "Bean" }]


db.open()
    .then(function () {

        var taskList = [];
        personVList.forEach(function (_person) {

            //查找

            var t = db
                .select()
                .from('Person')
                .where(_person)
                .all()
                .then(function (select) {
                    console.log('Hitters:', select);

                    if (select && select.length != 0) {
                        return;
                    }


                    //插入数据
                    // db
                    // .insert()
                    // .into('Person')
                    // .set(_person);

                    db.create('VERTEX', 'Person')
                        .set(_person)
                        .one()
                        .then(function (p) {
                            console.log('Created Vertex: ' + p.name);
                        });

                });


            taskList.push(t);
        });


        var task = taskList.reduce(function (preTask, currentTask) {
            return preTask
                .then(function (res) {

                    console.log(res);
                    return currentTask;
                });
        });

        task
            .then(function (res) {
                console.log(res);
            })
            .catch(function (err) {
                //
                console.log(err);
            })
    })
    .catch(function (err) {
        console.log(err);
    });
