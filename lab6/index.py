"""
Лабораторна робота №6 — Частина 1
Робота з індексами MongoDB та аналіз швидкодії
"""

from pymongo import MongoClient
from datetime import datetime
import time


# Підключення до MongoDB
client = MongoClient("mongodb://localhost:27017")

# Вибір бази даних та колекції
db = client["lab6_database"]
collection = db["orders"]


# -------------------------------------------------
# Створення простого індексу
# -------------------------------------------------

print("Створення індексу для поля 'product'...")

collection.create_index("product")

print("Індекс успішно створено!\n")


# -------------------------------------------------
# Запит з використанням індексу
# -------------------------------------------------

start_time = time.time()

result = list(collection.find({
    "product": "Laptop"
}))

end_time = time.time()

print("Пошук документів за product = 'Laptop'")
print(f"Кількість знайдених документів: {len(result)}")
print(f"Час виконання: {end_time - start_time:.6f} секунд")


# -------------------------------------------------
# Інформація explain()
# -------------------------------------------------

explain_data = collection.find({
    "product": "Laptop"
}).explain()

print("\nІнформація про план виконання:")
print(f"Тип операції: {explain_data['queryPlanner']['winningPlan']['stage']}")


# -------------------------------------------------
# Створення складеного індексу
# -------------------------------------------------

print("\nСтворення складеного індексу (product + date)...")

collection.create_index([
    ("product", 1),
    ("date", -1)
])

print("Складений індекс створено!\n")


# -------------------------------------------------
# Запит зі складеним індексом
# -------------------------------------------------

start_time2 = time.time()

result2 = list(collection.find({
    "product": "Laptop",
    "date": {
        "$gte": datetime(2024, 5, 1),
        "$lte": datetime(2024, 12, 31)
    }
}))

end_time2 = time.time()

print("Пошук за product та date")
print(f"Кількість знайдених документів: {len(result2)}")
print(f"Час виконання: {end_time2 - start_time2:.6f} секунд")


# -------------------------------------------------
# Виведення всіх індексів
# -------------------------------------------------

print("\nСписок індексів колекції 'orders':")

for index in collection.list_indexes():
    print(f"{index['name']} -> {index['key']}")


# Закриття підключення
client.close()