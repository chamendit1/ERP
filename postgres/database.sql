CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);


CREATE TABLE clients (
  client_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address VARCHAR(255)
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL,
  orderitem_id INTEGER,
  status VARCHAR(255),
  notes VARCHAR(255),
  total MONEY,
  vat MONEY,
  currency MONEY,
  subtotal MONEY,
  rates MONEY,
  creator VARCHAR(50),
  duedate VARCHAR,
);

CREATE TABLE orderitems (
  orderitem_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  quantity VARCHAR(255),
  price MONEY
);
