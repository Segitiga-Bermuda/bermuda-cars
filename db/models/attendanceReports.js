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
            date: {
                type: DataTypes.INTEGER,
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
