DROP DATABASE IF EXISTS pointOfSales;
CREATE DATABASE pointOfSales;

USE pointOfSales;
INSERT INTO Users ( firstname, lastname, storename, email, password, CreatedAt, UpdatedAt)
VALUES ("Jim", "Jones", "JJ's Farmers Market", "JJsMarket@example.com", "abc123", now(), now());

USE pointOfSales;
INSERT INTO categories (categoryName, CreatedAt, UpdatedAt, UserID ) VALUES ('fuchsia',now(), now(), 1);

USE pointOfSales;
INSERT INTO Items (itemname, price, quantity,CreatedAt, UpdatedAt, CategoryID ) VALUES ('OJ', '27.00', 10, now(), now(), 1);
INSERT INTO Items (itemname, price, quantity,CreatedAt, UpdatedAt, CategoryID ) VALUES ('Bananas', '27.00', 10, now(), now(), 1);
INSERT INTO Items (itemname, price, quantity,CreatedAt, UpdatedAt, CategoryID ) VALUES ('Lettuce', '27.00', 10, now(), now(), 1);
INSERT INTO Items (itemname, price, quantity,CreatedAt, UpdatedAt, CategoryID ) VALUES ('Bread', '27.00', 10, now(), now(), 1);