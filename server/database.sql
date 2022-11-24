CREATE DATABASE ERP;

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    status VARCHAR(255),
    creator VARCHAR(255) NOT NULL,
    customer INT NOT NULL,
    product INT NOT NULL,
    total INT NOT NULL,
    notes VARCHAR(255),
    currency VARCHAR(255),
    orderStatus VARCHAR(255),
    paymentStatus VARCHAR(255),
    dueDate VARCHAR(255),
    totalAmountReceived INT NOT NULL,
    Foreign Key (customer) references customer (customer_id),
    Foreign Key (product) references product (product_id),
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE customer(
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    company VARCHAR(50) NOT NULL,
    creator VARCHAR(50) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE product(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    unitPrice VARCHAR(50) NOT NULL,
    quantity VARCHAR(50) NOT NULL
);

CREATE TABLE paymentRecords(
    payment_id SERIAL PRIMARY KEY,
    amountPaid VARCHAR(50) NOT NULL,
    datePaid TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    paymentMethod VARCHAR(50) NOT NULL,
    paidBy INT NOT NULL,
    Foreign Key (paidBy) references customer (customer_id)
);



ALTER TABLE orders ADD CONSTRAINT
customer Foreign Key (customer_id) references customer (customer_id);