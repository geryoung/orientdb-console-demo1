
var ODatabase = require('orientjs').ODatabase;
var db = new ODatabase({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'hello',
  name: 'test2'
});

///////////////////////////////////////////////////////////////////////////////////
// 数据准备
///////////////////////////////////////////////////////////////////////////////////
var sqlList = [];


// sqlList = [
//   'CREATE CLASS Paper EXTENDS V',
//   'CREATE CLASS Keyword EXTENDS V',
//   'CREATE CLASS Contain EXTENDS E'
// ];

// sqlList = [
//   "CREATE VERTEX Paper SET name = 'P1'",
//   "CREATE VERTEX Paper SET name = 'P2'",
//   "CREATE VERTEX Paper SET name = 'P3'",
//   "CREATE VERTEX Paper SET name = 'P4'",
//   "CREATE VERTEX Paper SET name = 'P5'",
//   "CREATE VERTEX Paper SET name = 'P6'",
//   "CREATE VERTEX Paper SET name = 'P7'"
// ];


// sqlList = [
//   "CREATE VERTEX Keyword SET name = 'A'",
//   "CREATE VERTEX Keyword SET name = 'B'",
//   "CREATE VERTEX Keyword SET name = 'C'",
//   "CREATE VERTEX Keyword SET name = 'D'",
//   "CREATE VERTEX Keyword SET name = 'E'",
//   "CREATE VERTEX Keyword SET name = 'F'",
//   "CREATE VERTEX Keyword SET name = 'G'"
// ]


// sqlList = [
// 'create edge Contain FROM ( select from Paper where name="P1") To (select from Keyword where name="A");',
// 'create edge Contain FROM ( select from Paper where name="P2") To (select from Keyword where name="B");',
// 'create edge Contain FROM ( select from Paper where name="P2") To (select from Keyword where name="A");',
// 'create edge Contain FROM ( select from Paper where name="P2") To (select from Keyword where name="D");',
// 'create edge Contain FROM ( select from Paper where name="P2") To (select from Keyword where name="E");',
// 'create edge Contain FROM ( select from Paper where name="P2") To (select from Keyword where name="F");',
// 'create edge Contain FROM ( select from Paper where name="P3") To (select from Keyword where name="B");',
// 'create edge Contain FROM ( select from Paper where name="P4") To (select from Keyword where name="B");',
// 'create edge Contain FROM ( select from Paper where name="P5") To (select from Keyword where name="A");',
// 'create edge Contain FROM ( select from Paper where name="P5") To (select from Keyword where name="C");',
// 'create edge Contain FROM ( select from Paper where name="P6") To (select from Keyword where name="A");',
// 'create edge Contain FROM ( select from Paper where name="P6") To (select from Keyword where name="F");',
// 'create edge Contain FROM ( select from Paper where name="P6") To (select from Keyword where name="G");',
// 'create edge Contain FROM ( select from Paper where name="P7") To (select from Keyword where name="A");'
// ];


///////////////////////////////////////////////////////////////////////////////////
// in\out 测试
///////////////////////////////////////////////////////////////////////////////////

/**
   {
    "@type": "d",
    "@class": "Contain",
    "out": "#26:0",
    "in": "#30:1",
    "@rid": "#34:1",
    "@version": 1
  },

  {
    "@type": "d",
    "@class": "Keyword",
    "in_Contain": [
    "#34:1",
    "#36:2"
    ],
    "name": "F",
    "@rid": "#30:1",
    "@version": 3
  }

  {
    "@type": "d",
    "@class": "Paper",
    "out_Contain": [
    "#34:0",
    "#35:0",
    "#36:0",
    "#33:1",
    "#34:1"
    ],
    "name": "P2",
    "@rid": "#26:0",
    "@version": 6
  },
 */

///////////////////////////////////////////////////////////////////////////////////
// 数据查询
///////////////////////////////////////////////////////////////////////////////////
var sql;
sql = 'SELECT from Contain';
sql = 'SELECT from Paper';

sql = "select from Contain where inE('Contain').out('Keyword').name CONTAINS 'A'"; //n
sql = "select from inE('Contain').out('Keyword')"; //n
sql = "TRAVERSE out('Contain') from #34:1 WHILE $depth < 3"; //n
sql = "select FROM (TRAVERSE in('Contain') FROM (SELECT FROM Keyword WHERE name = 'A') WHILE $depth = 0) ";
// sql = "select FROM (TRAVERSE both('Contain'),both('Contain') FROM (SELECT FROM Keyword WHERE name = 'A') WHILE $depth < 3 ) ";
sql = "select FROM (TRAVERSE in('Contain') FROM (SELECT FROM Keyword WHERE name = 'A') WHILE $depth < 3 ) ";

//sql = 'SELECT from Keyword';

//sql = 'DELETE EDGE Friend WHERE 1=1'; //删除所有 Friend 边
//sql = 'SELECT from FRIEND';
//sql = 'SELECT from Person'; 


db.open()
  .then(function () {

    if (sql) {
      var t = db.query(sql)
        .then(function (res) {
          console.log('sql result: ' + JSON.stringify(res, null, ' '));
        })
        .catch(function (err) {
          console.log(err);
        });

      return;
    } else {

      sqlList.forEach(function (sql) {
        var t = db.query(sql)
          .then(function (res) {
            console.log('sql result: ' + JSON.stringify(res, null, ' '));
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    }
  })
  .catch(function (err) {
    console.log(err);
  });
