CREATE DATABASE IF NOT EXISTS `Sm9zL7ZgRB`;

USE `Sm9zL7ZgRB`;

CREATE TABLE IF NOT EXISTS `Members` (
    `id` INT(11) UNSIGNED NOT NULL auto_increment,
    `fullName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    `avatarPath` VARCHAR(100) NOT NULL,
    `role` ENUM("admin", "executive", "employer", "user") NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);