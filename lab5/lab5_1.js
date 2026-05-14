// ============================================
// Лабораторна робота №5.1
// MongoDB Basics
// Варіант 13 — Ресторан
// ============================================


// ==========================
// Створення бази даних
// ==========================
use lab5


// ==========================
// Створення колекцій
// ==========================
db.createCollection("guests")
db.createCollection("menu")
db.createCollection("checks")

show collections


// ==========================
// Заповнення guests
// ==========================
db.guests.insertMany([
  { name: "Ivan Petrenko", phone: "0501111111", tableNo: 1 },
  { name: "Olha Shevchenko", phone: "0502222222", tableNo: 2 },
  { name: "Andrii Kovalenko", phone: "0503333333", tableNo: 3 },
  { name: "Maria Bondarenko", phone: "0504444444", tableNo: 4 },
  { name: "Dmytro Tkachenko", phone: "0505555555", tableNo: 5 },
  { name: "Sofiia Melnyk", phone: "0506666666", tableNo: 6 },
  { name: "Taras Boyko", phone: "0507777777", tableNo: 7 },
  { name: "Iryna Savchenko", phone: "0508888888", tableNo: 8 },
  { name: "Roman Polishchuk", phone: "0509999999", tableNo: 9 },
  { name: "Kateryna Honchar", phone: "0501234567", tableNo: 10 }
])


// ==========================
// Заповнення menu
// ==========================
db.menu.insertMany([
  { name: "Pizza", category: "Main", price: 250 },
  { name: "Burger", category: "Main", price: 180 },
  { name: "Pasta", category: "Main", price: 220 },
  { name: "Soup", category: "Starter", price: 120 },
  { name: "Salad", category: "Starter", price: 150 },
  { name: "Steak", category: "Main", price: 450 },
  { name: "Tea", category: "Drink", price: 60 },
  { name: "Coffee", category: "Drink", price: 80 },
  { name: "Juice", category: "Drink", price: 90 },
  { name: "Ice Cream", category: "Dessert", price: 110 },
  { name: "Cake", category: "Dessert", price: 130 },
  { name: "Sushi", category: "Main", price: 320 },
  { name: "Lemonade", category: "Drink", price: 100 },
  { name: "Fries", category: "Snack", price: 95 },
  { name: "Hot Dog", category: "Snack", price: 140 }
])


// ==========================
// Заповнення checks
// ==========================
db.checks.insertMany([

{
  checkNo: "CHK001",
  guestPhone: "0501111111",
  date: new Date("2025-05-01"),
  items: [
    { dish: "Pizza", qty: 2, price: 250 },
    { dish: "Tea", qty: 2, price: 60 }
  ],
  status: "Paid"
},

{
  checkNo: "CHK002",
  guestPhone: "0502222222",
  date: new Date("2025-05-02"),
  items: [
    { dish: "Burger", qty: 1, price: 180 },
    { dish: "Coffee", qty: 1, price: 80 }
  ],
  status: "Paid"
},

{
  checkNo: "CHK003",
  guestPhone: "0503333333",
  date: new Date("2025-05-03"),
  items: [
    { dish: "Steak", qty: 1, price: 450 },
    { dish: "Juice", qty: 2, price: 90 }
  ],
  status: "Pending"
},

{
  checkNo: "CHK004",
  guestPhone: "0504444444",
  date: new Date("2025-05-04"),
  items: [
    { dish: "Soup", qty: 2, price: 120 },
    { dish: "Cake", qty: 1, price: 130 }
  ],
  status: "Paid"
},

{
  checkNo: "CHK005",
  guestPhone: "0505555555",
  date: new Date("2025-05-05"),
  items: [
    { dish: "Sushi", qty: 1, price: 320 },
    { dish: "Tea", qty: 1, price: 60 }
  ],
  status: "Cancelled"
},

{
  checkNo: "CHK006",
  guestPhone: "0506666666",
  date: new Date("2025-05-06"),
  items: [
    { dish: "Pasta", qty: 2, price: 220 },
    { dish: "Juice", qty: 1, price: 90 }
  ],
  status: "Paid"
},

{
  checkNo: "CHK007",
  guestPhone: "0507777777",
  date: new Date("2025-05-07"),
  items: [
    { dish: "Fries", qty: 3, price: 95 },
    { dish: "Coffee", qty: 2, price: 80 }
  ],
  status: "Pending"
},

{
  checkNo: "CHK008",
  guestPhone: "0508888888",
  date: new Date("2025-05-08"),
  items: [
    { dish: "Hot Dog", qty: 2, price: 140 },
    { dish: "Tea", qty: 2, price: 60 }
  ],
  status: "Paid"
},

{
  checkNo: "CHK009",
  guestPhone: "0509999999",
  date: new Date("2025-05-09"),
  items: [
    { dish: "Cake", qty: 1, price: 130 },
    { dish: "Lemonade", qty: 2, price: 100 }
  ],
  status: "Paid"
},

{
  checkNo: "CHK010",
  guestPhone: "0501234567",
  date: new Date("2025-05-10"),
  items: [
    { dish: "Salad", qty: 1, price: 150 },
    { dish: "Soup", qty: 1, price: 120 }
  ],
  status: "Cancelled"
}

])


// ============================================
// READ
// ============================================

// Усі гості
db.guests.find().pretty()


// Гості за номером столика
db.guests.find({
  tableNo: 5
})


// Оплачені чеки
db.checks.find({
  status: "Paid"
})


// Чеки за період
db.checks.find({
  date: {
    $gte: new Date("2025-05-01"),
    $lte: new Date("2025-05-10")
  }
})


// ============================================
// UPDATE
// ============================================

// Зміна телефону
db.guests.updateOne(
  { name: "Ivan Petrenko" },
  {
    $set: {
      phone: "0671111111"
    }
  }
)


// Збільшення ціни напоїв
db.menu.updateMany(
  { category: "Drink" },
  {
    $inc: {
      price: 10
    }
  }
)


// ============================================
// DELETE
// ============================================

// Видалення одного документа
db.guests.deleteOne({
  name: "Taras Boyko"
})


// Видалення чеків зі статусом Cancelled
db.checks.deleteMany({
  status: "Cancelled"
})


// ============================================
// Запити та фільтрація
// ============================================

// Страви дорожче 200
db.menu.find({
  price: {
    $gt: 200
  }
})


// Страви дешевше 100
db.menu.find({
  price: {
    $lt: 100
  }
})


// Напої та десерти
db.menu.find({
  category: {
    $in: ["Drink", "Dessert"]
  }
})


// Кількість страв >= 2
db.checks.find({
  "items.qty": {
    $gte: 2
  }
})


// AND
db.checks.find({
  $and: [
    { status: "Paid" },
    {
      date: {
        $gte: new Date("2025-05-01"),
        $lte: new Date("2025-05-10")
      }
    }
  ]
})


// OR
db.menu.find({
  $or: [
    { category: "Drink" },
    { price: { $lt: 120 } }
  ]
})


// ============================================
// 5 власних запитів
// ============================================

// Основні страви
db.menu.find({
  category: "Main"
})


// Страви від 100 до 300
db.menu.find({
  price: {
    $gte: 100,
    $lte: 300
  }
})


// Pending чеки
db.checks.find({
  status: "Pending"
})


// Гості за столиками > 5
db.guests.find({
  tableNo: {
    $gt: 5
  }
})


// Snack або Dessert
db.menu.find({
  category: {
    $in: ["Snack", "Dessert"]
  }
})


// ============================================
// Індексація
// ============================================

// Індекс guests.phone
db.guests.createIndex(
  { phone: 1 },
  { unique: true }
)


// Індекс menu
db.menu.createIndex({
  category: 1,
  price: 1
})


// Індекс checks
db.checks.createIndex({
  status: 1,
  date: -1
})


// ============================================
// Explain
// ============================================

db.checks.find({
  status: "Paid"
}).explain("executionStats")


// ============================================
// Перегляд індексів
// ============================================

db.checks.getIndexes()


// ============================================
// Видалення індексу
// ============================================

db.checks.dropIndex("status_1_date_-1")