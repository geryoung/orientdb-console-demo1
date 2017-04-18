

```shell

# 连接服务器
connect remote:localhost root hello

# 连接数据库
CONNECT remote:localhost/test root hello

# create

select from Paper

```


```sql
## 论文A 被关键词关联
MATCH { class: Paper, as: paper, where: (name = '论文A') }.out('Relates') { as: keyword } RETURN paper, keyword
+----+-----+-------+
|#   |paper|keyword|
+----+-----+-------+
|0   |#53:0|#49:0  |
|1   |#53:0|#50:0  |
|2   |#53:0|#51:0  |
+----+-----+-------+

## 论文A 包含所有的 关键词
MATCH { class: Paper, as: paper, where: (name = '论文A') }.in('Contain') { as: keyword } RETURN paper, keyword




MATCH { class: Paper, as: paper, where: (name = '论文A') }.out('Keyword') { as: keyword } RETURN paper, keyword
 Keyword 不是 Edge
MATCH { class: Paper, as: paper, where: (name = '论文A') }.both('Keyword') { as: keyword } RETURN paper, keyword
 Keyword 不是 Edge


## 论文A 直接相关论文
MATCH { class: Paper, as: paper, where: (name = '论文A') }.in('Contain').in('Relates') { as: relatePaper } RETURN paper, relatePaper


## 关键词1 直接相关关键词
MATCH { class: Keyword, as: keyword, where: (name = '关键词1') }.out('Contain').out('Relates') { as: relateKeyword } RETURN keyword, relateKeyword

## 论文A 直接相关论文 top10
...

## 关键词1 直接相关关键词 top10
...

## 间接相关论文
MATCH { class: Paper, as: paper, where: (name = '论文A') }.in('Contain').in('Relates').in('Contain').in('Relates') { as: relatePaper } RETURN paper, relatePaper

+----+-----+-----------+
|#   |paper|relatePaper|
+----+-----+-----------+
|0   |#53:0|#53:0      |
|1   |#53:0|#54:0      |
+----+-----+-----------+

```
