
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
//   "CREATE VERTEX Paper SET name = 'P7'",
//   "CREATE VERTEX Paper SET name = 'PN'"
// ];


// sqlList = [
//   "CREATE VERTEX Keyword SET name = 'A'",
//   "CREATE VERTEX Keyword SET name = 'B'",
//   "CREATE VERTEX Keyword SET name = 'C'",
//   "CREATE VERTEX Keyword SET name = 'D'",
//   "CREATE VERTEX Keyword SET name = 'E'",
//   "CREATE VERTEX Keyword SET name = 'F'",
//   "CREATE VERTEX Keyword SET name = 'G'",
//   "CREATE VERTEX Keyword SET name = 'N'"
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
// 'create edge Contain FROM ( select from Paper where name="P7") To (select from Keyword where name="A");',

// 'create edge Contain FROM ( select from Paper where name="P4") To (select from Keyword where name="N");'
// 'create edge Contain FROM ( select from Paper where name="PN") To (select from Keyword where name="N");'
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
// sql = 'SELECT from Contain';
// sql = 'SELECT from Paper';

// sql = "select from Contain where inE('Contain').out('Keyword').name CONTAINS 'A'"; //n
// sql = "select from inE('Contain').out('Keyword')"; //n
// sql = "TRAVERSE out('Contain') from #34:1 WHILE $depth < 3"; //n
// sql = "select FROM (TRAVERSE both('Contain'),both('Contain') FROM (SELECT FROM Keyword WHERE name = 'A') WHILE $depth < 3 ) ";
sql = "select FROM (TRAVERSE in('Contain'),out('Contain') FROM (SELECT FROM Keyword WHERE name = 'A') WHILE $depth < 3 ) ";
sql = "select name FROM (TRAVERSE in('Contain'),out('Contain') FROM (SELECT FROM Keyword WHERE name = 'A') WHILE $depth < 3 )  WHERE @class='Keyword'";
sql = "select name FROM (TRAVERSE in('Contain'),out('Contain') FROM (SELECT FROM Keyword WHERE name = 'A') WHILE $depth < 3 )  WHERE @class='Paper'";
sql = "select FROM Contain " ; //success -> 返回 14

/**
 * Edge 搜索
 */
// sql = "select count(*) as ecount FROM Contain GROUP BY out ORDER BY ecount" ; //success -> 返回 7
// sql = "select * FROM Contain WHERE in = #29:0"; 
// sql = "select * FROM Contain WHERE out = #29:0"; 
sql = "select * FROM Contain WHERE in = #29:0"; //success
sql = "select * FROM Contain WHERE 'in' in ['#29:0']"; //n

// sql = "select * FROM Keyword WHERE name in ['A', 'B']";
// sql = "select * FROM Paper";



// sql = "select OUT('Contain') FROM Paper WHERE name='P1'" //success
// sql = "select OUT('Contain'),OUT('Contain') FROM Paper" // s-> 7
// sql = "select OUT('Contain')FROM Paper" //s->7
// sql = "select OUT('Contain').OUT('Contain') FROM Paper" //s->7


// sql = "select OUT('Contain').OUT('Contain') FROM Paper  WHERE name='P7'" // n
// sql = "select OUT('Contain') FROM Paper  WHERE name='P7'" //s->1
// sql = "select OUT('Contain'),OUT('Contain') FROM Paper  WHERE name='P7'" // n


// sql = "select OUT('Contain').name as n FROM Paper  WHERE name='P2'" //s->5[]

// sql = "select in('Contain').name as n FROM Paper  WHERE n='A'" //n
// sql = "select OUT('Contain').name as n FROM Paper  WHERE n[0]='A'" //n

// sql = "select in('Contain').name as n FROM Paper  WHERE name='P2'" //n


/**
 * 
 */
// sql = "select OUT('Contain').in('Contain').name as n FROM Paper  WHERE name='P2'" //y
// sql = "select OUT('Contain').name as n FROM Paper  WHERE name='P2'" //y
// sql = "select in('Contain').name as n FROM Keyword  WHERE name in ['A', 'B'] " //y


/**
 * 相关关键词，潜在关键词
 */
// sql = 'MATCH {class:Keyword, as:keyword, where: (name = "A")}.in("Contain").out("Contain")' +
//   '{as: kes} RETURN keyword, kes'; //s-7
// sql = 'MATCH {class:Keyword, as:keyword, where: (name = "A")}.in("Contain").out("Contain").in("Contain").out("Contain")' +
//   '{as: kes} RETURN keyword, kes'; //s-8 多一个 关键词 N

// sql = "select in('Contain').out('Contain').name as n FROM Keyword GROUP BY n UNWIND n WHERE name='A' " //n
// sql = "select in('Contain').out('Contain').name as n  FROM Keyword WHERE name='A' " //n


var sql2 = 'MATCH {class:Person, as:person, where: (name= "John" AND surename="Doe")}.both("Friend")' +
  '{as: friendOfFriend} RETURN person, friendOfFriend'; //

/**
 * 最短路径
 */
// sql = "select shortestPath(#25:0, #25:1)"; //success
// sql = "select shortestPath(#25:0, #25:1, null, 'Contain')"; //success
// sql = "select shortestPath(#25:0, #25:1, null, 'Contain', {'maxDepth': 0})";  //success
// sql = "select shortestPath((select from Keyword where name='A'), (select from Keyword where name='B'))"; //success

// sql = "CREATE VERTEX Paper SET name = 'PN'";
// sql = "CREATE VERTEX Keyword SET name = 'N'";
// sql = 'create edge Contain FROM ( select from Paper where name="P4") To (select from Keyword where name="N");';
// sql = 'create edge Contain FROM ( select from Paper where name="PN") To (select from Keyword where name="N");';



//sql = "select name "
//sql = "select FROM Contain ";


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
