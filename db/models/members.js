'use strict'

module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define(
        'Members',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            born: {
                type: DataTypes.DATE,
                allowNull: false
            },
            gender: {
                type: DataTypes.ENUM({
                    values: [
                        'Male', 'Female'
                    ]
                }),
                allowNull: false
            },
            employeeId: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'None'
            },
            departement: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'None'
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM({
                    values: [
                        'Admin', 'Executive', 'Employee', 'User'
                    ]
                }),
                allowNull: false
            },
            avatarPath: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: './assets/images/person.png'
            }
        },
        {}
    )

    return Members
}