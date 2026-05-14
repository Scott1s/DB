# ============================================
# Лабораторна робота №6 — Частина 2
# Налаштування Replica Set у MongoDB
# ============================================


# ==================================================
# КРОК 1. Створення папок для збереження даних
# ==================================================

# Windows
mkdir D:\mongo-data\node1
mkdir D:\mongo-data\node2
mkdir D:\mongo-data\node3

# Linux / macOS
# mkdir -p /data/node1 /data/node2 /data/node3



# ==================================================
# КРОК 2. Запуск трьох серверів MongoDB
# Кожен запускати в окремому терміналі
# ==================================================

# --- Сервер 1 ---
mongod --replSet myReplica --port 27017 --dbpath D:\mongo-data\node1 --bind_ip localhost

# --- Сервер 2 ---
mongod --replSet myReplica --port 27018 --dbpath D:\mongo-data\node2 --bind_ip localhost

# --- Сервер 3 ---
mongod --replSet myReplica --port 27019 --dbpath D:\mongo-data\node3 --bind_ip localhost



# ==================================================
# КРОК 3. Ініціалізація Replica Set
# ==================================================

# Підключення до першого вузла
mongosh --port 27017

# Команди в mongosh

rs.initiate()

rs.add("localhost:27018")

rs.add("localhost:27019")

rs.status()



# ==================================================
# КРОК 4. Перевірка реплікації даних
# ==================================================

# На Primary-сервері

use replicationLab

db.products.insertOne({
    name: "Laptop",
    price: 32000,
    createdAt: new Date()
})



# Підключення до Secondary
mongosh --port 27018

# Дозвіл читання з Secondary
db.getMongo().setReadPref("secondary")

use replicationLab

db.products.find()



# ==================================================
# КРОК 5. Перевірка відмовостійкості
# ==================================================

# Зупинити Primary-сервер
# (Ctrl + C у терміналі першого вузла)

# Після цього один із Secondary
# автоматично стане новим Primary

# Перевірка статусу
rs.status()