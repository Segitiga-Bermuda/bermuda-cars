'use strict'

module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define(
        'Sales',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            itemId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            month: {
                type: DataTypes.ENUM({
                    values: [
                        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
                    ]
                }),
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sold: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            unsold: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {}
    )

    return Sales
}