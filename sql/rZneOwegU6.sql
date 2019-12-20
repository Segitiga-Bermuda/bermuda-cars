CREATE DATABASE IF NOT EXISTS `rZneOwegU6`;

USE `rZneOwegU6`;

CREATE TABLE IF NOT EXISTS `Members` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(100) NOT NULL,
    `born` DATE NOT NULL,
    `gender` ENUM(
        "Male", 
        "Female"
    ) NOT NULL,
    `employeeId` VARCHAR(12) DEFAULT 'None',
    `departement` VARCHAR(25) DEFAULT 'None',
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM(
        "Admin", 
        "Executive", 
        "Employee", 
        "User"
    ) NOT NULL,
    `avatarPath` VARCHAR(100) DEFAULT './assets/images/person.png',
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `Inventories` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `item` VARCHAR(50) NOT NULL,
    `price` INT(11) UNSIGNED NOT NULL,
    `materialCost` INT(11) UNSIGNED NOT NULL,
    `laborCost` INT(11) UNSIGNED NOT NULL,
    `overheadCost` INT(11) UNSIGNED NOT NULL,
    `color` VARCHAR(7) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `Sales` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INT(11) UNSIGNED NOT NULL,
    `itemId` INT(11) UNSIGNED NOT NULL,
    `month` ENUM(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ) NOT NULL,
    `year` SMALLINT(4) UNSIGNED NOT NULL,
    `sold` TINYINT(2) UNSIGNED NOT NULL,
    `unsold` TINYINT(2) UNSIGNED NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`userId`) REFERENCES `Members`(`id`),
    FOREIGN KEY(`itemId`) REFERENCES `Inventories`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `Tasks` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INT(11) UNSIGNED NOT NULL,
    `task` VARCHAR(100) NOT NULL,
    `status` ENUM(
        "uncompleted", 
        "completed", 
        "deleted"
    ) DEFAULT "uncompleted",
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`userId`) REFERENCES `Members`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `AttendanceReports` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INT(11) UNSIGNED NOT NULL,
    `month` ENUM(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ) NOT NULL,
    `year` SMALLINT(4) UNSIGNED NOT NULL,
    `date` TINYINT(2) UNSIGNED NOT NULL,
    `status` ENUM(
        "Presence",
        "Sick",
        "Leave",
        "Absence"
    ) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`userId`) REFERENCES `Members`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
)