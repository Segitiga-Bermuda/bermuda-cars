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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatarPath: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM({
                    values: [
                        'admin',
                        'executive',
                        'employer',
                        'user'
                    ]
                }),
                allowNull: false
            }
        },
        {}
    )

    return Members
}