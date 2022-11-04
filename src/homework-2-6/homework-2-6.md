## Задание к занятию «2.6. База данных и хранение данных»

### Подготовка контейнера:

```
docker run --name mongoDB -d mongo
Unable to find image 'mongo:latest' locally
latest: Pulling from library/mongo
eaead16dc43b: Pull complete
8a00eb9f68a0: Pull complete
f683956749c5: Pull complete
b33b2f05ea20: Pull complete
3a342bea915a: Pull complete
fa956ab1c2f0: Pull complete
138a8542a624: Pull complete
acab179a7f07: Pull complete
f88335710e84: Pull complete
Digest: sha256:3b9bfc35335710340afe1e98c870491b2a969fd93b62505b4617eab73d97cec6
Status: Downloaded newer image for mongo:latest
f501e485dded256a18962b435718e69ae4747916d03dcc2773694c82e60edba5

docker exec -it mongoDB mongosh
Current Mongosh Log ID: 6364fb2c48eab199d5fe0c06
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0
Using MongoDB:          6.0.2
Using Mongosh:          1.6.0

For mongosh info see: https://docs.mongodb.com/mongodb-shell/


To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).
You can opt-out by running the disableTelemetry() command.

------
   The server generated these startup warnings when booting
   2022-11-04T11:43:50.925+00:00: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem       
   2022-11-04T11:43:51.397+00:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
   2022-11-04T11:43:51.397+00:00: /sys/kernel/mm/transparent_hugepage/enabled is 'always'. We suggest setting it to 'never'
   2022-11-04T11:43:51.397+00:00: vm.max_map_count is too low
------

------
   Enable MongoDB's free cloud-based monitoring service, which will then receive and display
   metrics about your deployment (disk utilization, CPU, operation statistics, etc).

   The monitoring data will be available on a MongoDB website with a unique URL accessible to you
   and anyone you share the URL with. MongoDB may use this information to make product
   improvements and to suggest MongoDB products and deployment options to you.

   To enable free monitoring, run the following command: db.enableFreeMonitoring()
   To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
------

test> db
test
```



### Написать следующие запросы для MongoDB:

* запрос(ы) для вставки данных минимум о двух книгах в коллекцию books
```
test> use books
switched to db books
books> db
books
books> db.books.insertOne({title: "Война и мир", authors: "Лев Толстой", description: "Роман в 4-х томах" })
{
  acknowledged: true,
  insertedId: ObjectId("6364fe1c7b175d87d81cd9b1")
}
books> db.books.find()
[
  {
    _id: ObjectId("6364fe1c7b175d87d81cd9b1"),
    title: 'Война и мир',
    authors: 'Лев Толстой',
    description: 'Роман в 4-х томах'
  }
]

books> db.books.insertMany([{ title: 'Жизнь Пи', authors: 'Янн  Мартел', description: '«Жизнь Пи» произвела настоящий культурный взрыв в мировой' }, { title: 'Му-му', authors: 'И. С. Тургенева', description: 'Рассказ русского писателя Ивана Сергеевича Тургенева, написанный в 1852 году. По данным исследователей, в основе произведения лежат реальные события, происходившие в московском доме матери писателя Варвары Петровны Тургеневой.' } ])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("636501687b175d87d81cd9b2"),
    '1': ObjectId("636501687b175d87d81cd9b3")
  }
}
books>books> db.books.find()
[  
  {
    _id: ObjectId("6364fe1c7b175d87d81cd9b1"),
    title: 'Война и мир',
    authors: 'Лев Толстой',
    description: 'Роман в 4-х томах'
  },
  {
    _id: ObjectId("636501687b175d87d81cd9b2"),
    title: 'Жизнь Пи',
    authors: 'Янн  Мартел',
    description: '«Жизнь Пи» произвела настоящий культурный взрыв в мировой'
  },
  {
    _id: ObjectId("636501687b175d87d81cd9b3"),
    title: 'Му-му',
    authors: 'И. С. Тургенева',
    description: 'Рассказ русского писателя Ивана Сергеевича Тургенева, написанный в 1852 году. По данным исследователей, в основе произведения лежат реальные события, происходившие в московском доме матери писателя Варвары Петровны Тургеневой.'
  }
]
```
* запрос для поиска полей документов коллекции books по полю title
```
books> db.books.find({"title": "Му-му"})
[
  {
    _id: ObjectId("636501687b175d87d81cd9b3"),
    title: 'Му-му',
    authors: 'И. С. Тургенева',
    description: 'Рассказ русского писателя Ивана Сергеевича Тургенева, написанный в 1852 году. По данным исследователей, в основе произведения лежат реальные события, происходившие в московском доме матери писателя Варвары Петровны Тургеневой.'
  }
]

books> db.books.find({"title": "Онегин"})

books>
```
* запрос для редактирования полей: description и authors коллекции books по _id записи
```
books> db.books.updateOne({_id: ObjectId("636501687b175d87d81cd9b3")},{$set: {authors: 'Пушкин', description: 'Конец'}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
books> db.books.find()
[  
  {
    _id: ObjectId("6364fe1c7b175d87d81cd9b1"),
    title: 'Война и мир',
    authors: 'Лев Толстой',
    description: 'Роман в 4-х томах'
  },
  {
    _id: ObjectId("636501687b175d87d81cd9b2"),
    title: 'Жизнь Пи',
    authors: 'Янн  Мартел',
    description: '«Жизнь Пи» произвела настоящий культурный взрыв в мировой'
  },
  {
    _id: ObjectId("636501687b175d87d81cd9b3"),
    title: 'Му-му',
    authors: 'Пушкин',
    description: 'Конец'
  }
]
books> db.books.updateOne({_id: ObjectId("636501687b175d87d81cd9b3")},{$set: {authors: 'Пушкин', description: 'Конец'}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
books> db.books.updateOne({_id: ObjectId("636501687b175d87d81cd9b3")},{$set: {authors: 'Пушкин', description: 'Коне'}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```