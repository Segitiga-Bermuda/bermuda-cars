'use strict'

module.exports = (sequelize, DataTypes) => {
    const AttendanceReports = sequelize.define(
        'AttendanceReports',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM({
                    values: [
                        'Presence',
                        'Sick',
                        'Leave',
                        'Absence'
                    ]
                }),
                allowNull: false
            }
        },
        {}
    )

    return AttendanceReports
}
