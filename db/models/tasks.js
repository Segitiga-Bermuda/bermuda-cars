'use strict'

module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define(
        'Tasks',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            task: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM({
                    values: [
                        'uncompleted', 'completed', 'deleted'
                    ]
                }),
                allowNull: true,
                defaultValue: 'uncompleted'
            }
        }
    )

    return Tasks
}