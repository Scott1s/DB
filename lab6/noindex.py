"""
Лабораторна робота №6 — Частина 1
Перевірка швидкості запитів без індексів у MongoDB
"""

from pymongo import MongoClient
from datetime import datetime
import time


# Підключення до MongoDB
client = MongoClient("mongodb://localhost:27017")

# Вибір бази даних
db = client["lab6_database"]
collection = db["orders"]


# -------------------------------------------------
# Пошук за одним полем
# -------------------------------------------------

start_time = time.time()

documents = list(collection.find({
    "product": "Laptop"
}))

finish_time = time.time()

print("Запит за product = 'Laptop'")
print(f"Знайдено документів: {len(documents)}")
print(f"Час виконання: {finish_time - start_time:.6f} секунд")


# -------------------------------------------------
# Пошук за декількома умовами
# -------------------------------------------------

start_time2 = time.time()

documents2 = list(collection.find({
    "product": "Laptop",
    "date": {
        "$gte": datetime(2024, 7, 1),
        "$lte": datetime(2024, 12, 31)
    }
}))

finish_time2 = time.time()

print("\nЗапит за product + date")
print(f"Знайдено документів: {len(documents2)}")
print(f"Час виконання: {finish_time2 - start_time2:.6f} секунд")


# -------------------------------------------------
# Аналіз виконання запиту
# -------------------------------------------------

explain_info = collection.find({
    "product": "Laptop"
}).explain()

print("\nExplain результат:")
print(f"Етап виконання: {explain_info['queryPlanner']['winningPlan']['stage']}")


# Закриття підключення
client.close()