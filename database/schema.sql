DROP DATABASE IF EXISTS pointOfSales;
CREATE DATABASE pointOfSales;

USE pointOfSales;
INSERT INTO Users ( firstname, lastname, storename, email, password, CreatedAt, UpdatedAt)
VALUES ("Jim", "Jones", "JJ's Farmers Market", "JJsMarket@example.com", "abc123", now(), now());

USE pointOfSales;
INSERT INTO categories (categoryName, CreatedAt, UpdatedAt, UserID ) VALUES ('fuchsia',now(), now(), 1);
INSERT INTO categories (categoryName, CreatedAt, UpdatedAt, UserID ) VALUES ('teal',now(), now(), 2);
INSERT INTO categories (categoryName, CreatedAt, UpdatedAt, UserID ) VALUES ('pink',now(), now(), 1);


USE pointOfSales;
INSERT INTO Items (itemname, price, quantity,CreatedAt, UpdatedAt, CategoryID ) VALUES ('OJ', '27.00', 10, now(), now(), 1);
INSERT INTO Items (itemname, price, quantity,CreatedAt, UpdatedAt, CategoryID ) VALUES ('Bananas', '27.00', 10, now(), now(), 2);
INSERT INTO Items (itemname, price, quantity,CreatedAt, UpdatedAt, CategoryID ) VALUES ('Lettuce', '27.00', 10, now(), now(), 1);
INSERT INTO Items (itemname, price, quantity,CreatedAt, UpdatedAt, CategoryID ) VALUES ('Bread', '27.00', 10, now(), now(), 2);

  
-- //stripe seed
INSERT INTO `pointofsales`.`stripes` (`id`, `StripeUserId`, `StripeRefreshToken`, `createdAt`, `updatedAt`, `UserId`) VALUES ('1', 'acct_1Eu8yaGIYkST5Tta', 'rt_FPu8LD2rUaaFvgBDyI3ptcHjOx0NH4UwYRhGb39CALMyfm50', '2019-07-12 15:23:55', '2019-07-12 15:23:55', '1');

select * from users;