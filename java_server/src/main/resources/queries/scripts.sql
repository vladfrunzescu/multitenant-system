CREATE DATABASE server_database;

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the table
CREATE TABLE item (
                      id SERIAL PRIMARY KEY,
                      name TEXT NOT NULL,
                      description TEXT,
                      price NUMERIC(19, 4),
                      image_link TEXT,
                      tenant_specific_attributes JSONB
);

-- Insert the data
INSERT INTO item (id, name, description, price, image_link, tenant_specific_attributes)
VALUES
    (1, 'Pizza', 'Cheesy pizza with toppings', 12.99, 'https://kitchenatics.com/wp-content/uploads/2020/09/Cheese-pizza-1.jpg', '{"category": "pizza"}'),
    (2, 'Burger', 'Juicy beef burger', 9.99, 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg', '{"category": "burger"}'),
    (3, 'Sushi', 'Fresh sushi rolls', 15.99, 'https://www.heinens.com/content/uploads/2023/06/Tuna-Sushi-Rolls-800x550-1.jpg', '{"category": "sushi"}'),
    (4, 'Pizza Prosciutto e Funghi Pizza Prosciutto e Funghi Pizza Prosciutto e Funghi Pizza Prosciutto e Funghi', 'Pizza Prosciutto e Funghi with toppings', 14.99, 'https://pizzachezboubou.ch/wp-content/uploads/sites/68/2020/07/Pizza-Prosciutto-E-Funghi.jpg', '{"category": "pizza"}'),
    (5, 'Burger with fries', 'Menu consisting of burger and fries', 21.50, 'https://www.cavendishfarms.com/globalassets/for-your-home/recipes/burger--fries.jpg', '{"category": "burger"}'),
    (6, 'Soup', 'Chef''s best soup', 10.00, 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Chicken-Soup-main-2.jpg', '{"category": "soup"}'
);
