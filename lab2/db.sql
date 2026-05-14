

CREATE DATABASE warehouse_db;

-- ============================================
-- Створення користувачів
-- ============================================

-- Адміністратор
CREATE USER admin_user WITH PASSWORD 'admin123';

-- Модератор
CREATE USER moderator_user WITH PASSWORD 'moder123';

-- Звичайний користувач
CREATE USER simple_user WITH PASSWORD 'user123';



-- Адміністратор має всі права
GRANT ALL PRIVILEGES ON DATABASE warehouse_db TO admin_user;

-- Модератор може читати та змінювати дані
GRANT CONNECT ON DATABASE warehouse_db TO moderator_user;

-- Звичайний користувач тільки перегляд
GRANT CONNECT ON DATABASE warehouse_db TO simple_user;