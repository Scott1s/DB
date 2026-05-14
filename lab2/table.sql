-- ============================================
-- Таблиця постачальників
-- ============================================

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    city VARCHAR(50)
);

-- ============================================
-- Таблиця товарів
-- ============================================

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    quantity_in_stock INT DEFAULT 0
);

-- ============================================
-- Таблиця поставок
-- ============================================

CREATE TABLE deliveries (
    delivery_id SERIAL PRIMARY KEY,
    supplier_id INT REFERENCES suppliers(supplier_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
    delivery_date DATE DEFAULT CURRENT_DATE,
    quantity INT CHECK(quantity > 0),
    total_price DECIMAL(10,2)
);