CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    avatar VARCHAR(255)
)

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    text TEXT NOT NULL,
    name VARCHAR(255),
    avatar VARCHAR(255),
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    user_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    user_id INT,
    text TEXT NOT NULL,
    name VARCHAR(255),
    avatar VARCHAR(255),
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    company VARCHAR(255),
    website VARCHAR(255),
    location VARCHAR(255),
    status VARCHAR(255),
    bio TEXT,
    githubUsername VARCHAR(255),
    skills VARCHAR(255),
    youtube VARCHAR(255),
    twitter VARCHAR(255),
    facebook VARCHAR(255),
    linkedin VARCHAR(255),
    instagram VARCHAR(255),
    date DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE experience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profile_id INT,
    title VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    `from` DATE,
    `to` DATE,
    `current` BOOLEAN,
    description TEXT,
    FOREIGN KEY (profile_id) REFERENCES profile(id)
);

CREATE TABLE education (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profile_id INT,
    school VARCHAR(255),
    degree VARCHAR(255),
    fos VARCHAR(255),
    `from` DATE,
    `to` DATE,
    `current` BOOLEAN,
    description TEXT,
    FOREIGN KEY (profile_id) REFERENCES profile(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create database `correlated_queries`;
use `correlated_queries`;

create table employees (
    `id` int primary key auto_increment,
    `name` varchar(40) not null,
    `department` varchar(50) not null,
    `salary` decimal(10, 2)
);

create table `customers` (
    `customer_id` int(11) primary key auto_increment,
    `name` varchar(40) not null,
    `country` varchar(255) not null
);

create table `orders` (
    `order_id` int(11) primary key auto_increment,
    `customer_id` int not null,
    `total_value` decimal(10, 2)
);

alter table orders
    add constraint fk_customer_id foreign key (customer_id) references customers(customer_id);

create table products (
    product_id int(11) primary key auto_increment,
    name varchar(255) not null,
    category_id int not null,
    price decimal(10, 2)
);

create table categories (
    category_id int(11) primary key auto_increment,
    name varchar(255)
);
use correlated_queries;


-- find products with price greater than category average
select *
from products p
join (
	select category_id, avg(price) as avg_price,
	from products
	group by category_id
) as cat_avg on p.cateogry_id = cat_avg.category
where p.price > cat_avg.avg_price;

with order_counts as (
    select customer_id, count(*) as order_count
    from orders
    group by customer_id
), country_avg as (
    select country, avg(order_count) as avg_order_count
    from orders_counts
    group by country
)
select *
from customers c
join order_count oc on c.id = oc.customer_id
join country_avg ca on c.country = ca.country
where oc.order_count > ca.avg_order_count