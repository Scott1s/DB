// ============================================
// Лабораторна робота №5.2
// Aggregation Framework MongoDB
// Варіант 13 — Ресторан
// ============================================


// ============================================
// Частина 1
// Базові агрегаційні операції
// ============================================


// 1. Чеки за останні 3 місяці
db.checks.aggregate([
  {
    $match: {
      date: {
        $gte: new Date("2025-02-01")
      }
    }
  }
])


// ============================================


// 2. Групування чеків за місяцем
db.checks.aggregate([
  {
    $group: {
      _id: {
        month: { $month: "$date" }
      },
      totalChecks: { $sum: 1 }
    }
  },
  {
    $sort: {
      "_id.month": 1
    }
  }
])


// ============================================


// 3. Сортування за сумою чека
db.checks.aggregate([

  {
    $unwind: "$items"
  },

  {
    $group: {
      _id: "$checkNo",

      totalAmount: {
        $sum: {
          $multiply: [
            "$items.qty",
            "$items.price"
          ]
        }
      }
    }
  },

  {
    $sort: {
      totalAmount: -1
    }
  }

])


// ============================================
// Частина 2
// Робота з масивами
// ============================================


// 4. Розгортання масиву items
db.checks.aggregate([

  {
    $unwind: "$items"
  }

])


// ============================================


// 5. Кількість проданих страв
db.checks.aggregate([

  {
    $unwind: "$items"
  },

  {
    $group: {
      _id: "$items.dish",

      totalSold: {
        $sum: "$items.qty"
      }
    }
  },

  {
    $sort: {
      totalSold: -1
    }
  }

])


// ============================================
// Частина 3
// З'єднання колекцій
// ============================================


// 6. Інформація про гостей у чеках
db.checks.aggregate([

  {
    $lookup: {
      from: "guests",
      localField: "guestPhone",
      foreignField: "phone",
      as: "guestInfo"
    }
  }

])


// ============================================


// 7. Найбільш активні гості
db.checks.aggregate([

  {
    $group: {
      _id: "$guestPhone",

      totalChecks: {
        $sum: 1
      }
    }
  },

  {
    $sort: {
      totalChecks: -1
    }
  }

])


// ============================================
// Частина 4
// Оптимізація
// ============================================


// 8. Перевірка продуктивності
db.checks.aggregate([

  {
    $match: {
      status: "Paid"
    }
  }

]).explain("executionStats")


// ============================================


// 9. Оптимізований агрегаційний запит
db.checks.createIndex({
  status: 1,
  date: -1
})


db.checks.aggregate([

  {
    $match: {
      status: "Paid"
    }
  },

  {
    $sort: {
      date: -1
    }
  }

]).explain("executionStats")


// ============================================
// Додаткові завдання
// ============================================


// 10. Категорії з найбільшою кількістю продажів
db.checks.aggregate([

  {
    $unwind: "$items"
  },

  {
    $lookup: {
      from: "menu",
      localField: "items.dish",
      foreignField: "name",
      as: "dishInfo"
    }
  },

  {
    $unwind: "$dishInfo"
  },

  {
    $group: {
      _id: "$dishInfo.category",

      totalSales: {
        $sum: "$items.qty"
      }
    }
  },

  {
    $sort: {
      totalSales: -1
    }
  }

])


// ============================================


// 11. Середня ціна страв у категоріях
db.menu.aggregate([

  {
    $group: {
      _id: "$category",

      averagePrice: {
        $avg: "$price"
      }
    }
  },

  {
    $sort: {
      averagePrice: -1
    }
  }

])


// ============================================


// 12. Гості з більше ніж одним чеком
db.checks.aggregate([

  {
    $group: {
      _id: "$guestPhone",

      totalChecks: {
        $sum: 1
      }
    }
  },

  {
    $match: {
      totalChecks: {
        $gt: 1
      }
    }
  }

])
