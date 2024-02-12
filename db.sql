-- Create a new database and use it
CREATE DATABASE IF NOT EXISTS cisc_499;
USE cisc_499;

-- Drop tables if they exist to prevent errors
DROP TABLE IF EXISTS rental_agreement;
DROP TABLE IF EXISTS make_group;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS own;
DROP TABLE IF EXISTS manage;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS owner;
DROP TABLE IF EXISTS credentials;
DROP TABLE IF EXISTS rental_group;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS property;

CREATE TABLE property (
    PID int NOT NULL AUTO_INCREMENT primary key,
    house_name varchar(255),
    address varchar(255),
    house_type varchar(255),
    monthly_rent decimal,
    bedrooms int,
    bathrooms decimal,
    parking bool,
    laundry varchar(255),
    fenced_yard bool,
    detached_or_semi varchar(255),
    floors int,
    elevator bool,
    number_of_people int,
    private_kitchen bool,
    furniture varchar(255),
    date_listed date,
    stats varchar(255) 
);

CREATE TABLE students (
    UID varchar(255) PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    phone_number varchar(255),
    address varchar(255),
    student_id int,
    year_of_graduation date,
    program varchar(255)
);

CREATE TABLE rental_group (
    GID varchar(4) PRIMARY KEY,
    preferred_type varchar(255),
    bedrooms int,
    bathrooms decimal,
    parking bool,
    laundry varchar(255),
    range_lower_bound int,
    range_upper_bound int,
    accessibility bool
);

CREATE TABLE credentials (
    UID varchar(255) PRIMARY KEY,
    password_ varchar(255),
    role_ varchar(255)
);

CREATE TABLE owner (
    OID varchar(255) PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    phone_number varchar(255) UNIQUE,
    address varchar(255)
);

CREATE TABLE manager (
    phone_number varchar(255) PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255)
);

CREATE TABLE manage (
    PID int,
    phone_number varchar(255),
    start_year date,
    end_date date,
    PRIMARY KEY (PID, phone_number),
    FOREIGN KEY (PID) REFERENCES property (PID),
    FOREIGN KEY (phone_number) REFERENCES manager (phone_number)
);

CREATE TABLE own (
    PID int,
    OID varchar(255),
    PRIMARY KEY (PID, OID),
    FOREIGN KEY (PID) REFERENCES property (PID),
    FOREIGN KEY (OID) REFERENCES owner (OID)
);

CREATE TABLE pictures (
    PID int,
    file_name varchar(255),
    PRIMARY KEY (PID, file_name),
    FOREIGN KEY (PID) REFERENCES property (PID)
);

CREATE TABLE rental_agreement (
    PID int,
    GID varchar(4),
    sign_date date,
    end_date date,
    start_date date,
    monthly_rent decimal,
    PRIMARY KEY (PID, GID),
    FOREIGN KEY (PID) REFERENCES property (PID),
    FOREIGN KEY (GID) REFERENCES rental_group (GID)
);

CREATE TABLE make_group (
    UID varchar(255),
    GID varchar(4),
    PRIMARY KEY (UID, GID),
    FOREIGN KEY (UID) REFERENCES students (UID),
    FOREIGN KEY (GID) REFERENCES rental_group (GID)
);

INSERT INTO property (house_name, address, house_type, monthly_rent, bedrooms, bathrooms, parking, laundry, fenced_yard, detached_or_semi, elevator, number_of_people, private_kitchen, furniture, date_listed)
VALUES
('334 Kingscourt Ave', '334 Kingscourt Ave, # 1, Kingston, ON K7K 4R5', 'Apartment', 2349, 3, 1, true, 'shared', false, 'yes', false, NULL, true, 'bed, desk, chair', '2023-11-7'),
('631 Aylmer Cres', '631 Aylmer Cres, # 2, Kingston, ON K7M 6K3', 'Apartment', 1899, 2, 1, true, 'shared', true, 'yes', false, NULL, true, 'bed, desk, chair', '2023-11-13'),
('136 Chatham St', '136 Chatham St, Kingston, ON K7K 4H4', 'Apartment', 3000, 2, 1, true, 'ensuite', true, 'yes', false, NULL, true, 'bed, desk, chair', '2024-1-12'),
('1145 Coverdale Dr', '1145 Coverdale Dr, Kingston, ON K7M 8X7', 'Apartment', 3000, 3, 1, true, 'ensuite', true, 'yes', false, NULL, true, 'bed, desk, chair', '2024-1-11'),
('139 Mowat Ave', '139 Mowat Ave, Kingston, ON K7M 1K5', 'Single Family Residence', 2700, 3, 1, true, 'shared', true, 'yes', false, NULL, true, 'bed, desk, chair', '2024-1-4');

UPDATE property
SET stats = 'on market'
WHERE house_name = '334 Kingscourt Ave' AND address = '334 Kingscourt Ave, # 1, Kingston, ON K7K 4R5';

UPDATE property
SET stats = 'pending'
WHERE PID IN (2, 3, 4);

UPDATE property
SET stats = 'off market'
WHERE PID IN (5, 6);

DELETE FROM property WHERE PID = 1;

UPDATE property
SET date_listed = '2023-11-12'
WHERE PID = 5;

UPDATE property
SET date_listed = '2023-11-12'
WHERE PID = 4;

UPDATE property
SET date_listed = '2024-1-12'
WHERE PID = 3;

UPDATE property
SET date_listed = '2024-1-11'
WHERE PID = 2;

UPDATE property
SET date_listed = '2023-11-7'
WHERE PID = 1;

SELECT * FROM property;

INSERT INTO students VALUES
('aa000', 'abc', 'ABC', '3433433433', '1 Sample Street, Kingston, ON', 20240213, (STR_TO_DATE('20270501'), 'Program0'),
('aa001', 'abd', 'ABD', '3433433434', '2 Sample Street, Kingston, ON', 20240214, (STR_TO_DATE('20270501'), 'Program1'),
('aa002', 'abe', 'ABE', '3433433435', '3 Sample Street, Kingston, ON', 20240215, (STR_TO_DATE('20270501'), 'Program2'),
('aa003', 'abf', 'ABF', '3433433436', '4 Sample Street, Kingston, ON', 20240216, (STR_TO_DATE('20270501'), 'Program3'),
('aa004', 'abg', 'ABG', '3433433437', '5 Sample Street, Kingston, ON', 20240217, (STR_TO_DATE('20270501'), 'Program4');

UPDATE students SET first_name = 'bbc' WHERE UID = 'aa000';
UPDATE students SET last_name = 'bbd' WHERE UID = 'aa001';
UPDATE students SET phone = '3433433445' WHERE UID = 'aa002';
UPDATE students SET address = '3 Alter Street, Kingston, ON' WHERE UID = 'aa003';
UPDATE students SET student_id = '20240317' WHERE UID = 'aa004';

INSERT INTO rental_group VALUES
('0000', 'apartment', 2, 2, NO, 'ensuite', NULL, NULL, NO),
('0001', 'house', 3, 1, YES, 'shared', NULL, NULL, YES);

UPDATE rental_group SET bathrooms = 1 WHERE GID = '0000';
UPDATE rental_group SET accessibility = NO WHERE GID = '0001';

INSERT INTO make_group VALUES
('aa000', '0000'),
('aa001', '0000'),
('aa002', '0001'),
('aa003', '0001'),
('aa004', '0001');
