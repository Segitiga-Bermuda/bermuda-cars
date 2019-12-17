'use strict'

module.exports = (sequelize, DataTypes) => {
    const Inventories = sequelize.define(
        'Inventories',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            item: {
                type: DataTypes.STRING,
                allowNull: false
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            materialCost: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            laborCost: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            overheadCost: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            profit: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            totalCost: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        })

    return Inventories
}