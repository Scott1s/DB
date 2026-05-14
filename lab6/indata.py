"""
Лабораторна робота №6 — Частина 1
Створення та додавання тестових даних у MongoDB
"""

from pymongo import MongoClient
import random
from datetime import datetime
import time


# Підключення до MongoDB
client = MongoClient("mongodb://localhost:27017")

# База даних і колекція
db = client["lab6_database"]
collection = db["orders"]


# Видалення старих даних
collection.delete_many({})

# Дані для генерації
products = ["Laptop", "Phone", "Tablet", "Headphones", "Monitor"]

print("Створення 100000 документів...")

start_time = time.time()

data = []

for i in range(100000):
    document = {
        "order_id": i + 1,
        "product": random.choice(products),
        "price": round(random.uniform(100, 3000), 2),
        "quantity": random.randint(1, 5),
        "date": datetime(
            2024,
            random.randint(1, 12),
            random.randint(1, 28)
        )
    }

    data.append(document)

# Вставка документів
collection.insert_many(data)

end_time = time.time()

print(f"Додано документів: {collection.count_documents({})}")
print(f"Час виконання: {end_time - start_time:.3f} секунд")

# Закриття з'єднання
client.close()