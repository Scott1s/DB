
-- ============================================
-- CREATE TABLE — створення таблиць
-- ============================================

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    city VARCHAR(50)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    quantity_in_stock INT DEFAULT 0
);

CREATE TABLE deliveries (
    delivery_id SERIAL PRIMARY KEY,
    supplier_id INT REFERENCES suppliers(supplier_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    delivery_date DATE DEFAULT CURRENT_DATE,
    quantity INT CHECK (quantity > 0),
    total_price DECIMAL(10,2)
);

-- ============================================
-- INSERT — вставка даних
-- ============================================

INSERT INTO suppliers (company_name, contact_person, phone, city) VALUES
('ТОВ ТехноСвіт', 'Іван Петренко', '+380671112233', 'Київ'),
('ФОП Коваленко', 'Марія Коваленко', '+380931234567', 'Львів'),
('SmartTrade', 'Олександр Шевченко', '+380501112244', 'Одеса');

INSERT INTO products (product_name, category, price, quantity_in_stock) VALUES
('Ноутбук Lenovo', 'Компютери', 32000.00, 10),
('Мишка Logitech', 'Аксесуари', 850.00, 50),
('Клавіатура HyperX', 'Аксесуари', 2400.00, 20),
('Монітор Samsung', 'Монітори', 7800.00, 15);

INSERT INTO deliveries (supplier_id, product_id, quantity, total_price) VALUES
(1, 1, 5, 160000.00),
(2, 2, 20, 17000.00),
(2, 3, 10, 24000.00),
(3, 4, 7, 54600.00);

-- ============================================
-- SELECT — вибірка даних
-- ============================================

SELECT 
    p.product_name,
    p.category,
    d.quantity,
    s.company_name AS supplier
FROM deliveries d
JOIN products p ON d.product_id = p.product_id
JOIN suppliers s ON d.supplier_id = s.supplier_id;

-- ============================================
-- UPDATE — оновлення даних
-- ============================================

UPDATE products
SET quantity_in_stock = 60
WHERE product_name = 'Мишка Logitech';

-- ============================================
-- DELETE — видалення даних
-- ============================================

DELETE FROM deliveries
WHERE delivery_id = 4;