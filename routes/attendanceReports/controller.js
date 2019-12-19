const { AttendanceReports } = require("../../db/models");
const Sequelize = require('sequelize')
const db = require("../../db/models");
module.exports = {
  addReport: (req, res) => {
    try {
      let currentDate = new Date();

      if (
        currentDate.getDay() === 5 ||
        currentDate.getDay() === 6
      ) {
        res.send({ message: "This is weekend." });
      }

      if (
        currentDate.getHours() < 6 ||
        currentDate.getHours() > 16
      ) {
        res.send({ message: "You Are Late." });
      } else {
        let year = currentDate.getFullYear(),
          month = currentDate.getMonth(),
          date = currentDate.getDate()

        switch (month) {
          case 0:
            month = 'January'
            break
          case 1:
            month = 'February'
            break
          case 2:
            month = 'March'
            break
          case 3:
            month = 'April'
            break
          case 4:
            month = 'May'
            break
          case 5:
            month = 'June'
            break
          case 6:
            month = 'July'
            break
          case 7:
            month = 'August'
            break
          case 8:
            month = 'September'
            break
          case 9:
            month = 'October'
            break
          case 10:
            month = 'November'
            break
          case 11:
            month = 'December'
            break
        }

        try {
          AttendanceReports
            .findAll({
              where: {
                year: year,
                month: month,
                date: date,
                userId: req.user.id,
              }
            })
            .then(result => {
              if (result.length > 0) {
                res.send({
                  message: 'You have been check in today.'
                })

                return null
              }

              AttendanceReports
                .create({
                  userId: req.user.id,
                  year: year,
                  month: month,
                  date: date,
                  status: req.body.status,
                })
                .then(result2 => {
                  AttendanceReports
                    .findAll({})
                    .then(result3 => {
                      res.send({
                        message: "Data is successfully added.",
                        data: result3
                      });
                    });
                })
                .catch(error => {
                  console.log(error);
                })
            })
            .catch(error => {
              console.log(error);
            })
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  },

  getAll: async (req, res) => {
    try {
      let users = await db.sequelize
        .query(
          "SELECT DISTINCT AttendanceReports.userId AS id from AttendanceReports  WHERE AttendanceReports.month='" + req.params.month + "' AND AttendanceReports.year=" + req.params.year + " ORDER BY AttendanceReports.userId;",
          {
            type: Sequelize.QueryTypes.SELECT
          })

      let rows = []

      for (let x = 0; x < users.length; ++x) {
        let row = await db.sequelize
          .query(
            "SELECT AttendanceReports.date, AttendanceReports.month, AttendanceReports.year, AttendanceReports.status, Members.fullName, Members.employerId, Members.departement FROM AttendanceReports JOIN Members ON AttendanceReports.userId = Members.id WHERE AttendanceReports.month='" + req.params.month + "' AND AttendanceReports.year=" + req.params.year + " AND AttendanceReports.userId = " + users[x].id + " ORDER BY AttendanceReports.date;",
            {
              type: Sequelize.QueryTypes.SELECT
            }
          )

        rows.push(row)
      }

      res.status(200).send({
        message: 'Get attendance reports.',
        data: rows
      })
    } catch (error) {
      console.log(error);
    }
  },

  deleteOne: async (req, res) => {
    try {
      if (!(
        req.user.role === 'Admin' ||
        req.user.role === 'Executive')
      ) {
        res.send({
          message: 'ordinary user cant edit this data'
        })
        return null
      }
      await AttendanceReports
        .destroy({
          where: {
            id: parseInt(req.params.id),
          }
        }).then(result => {
          db.sequelize
            .query(
              "SELECT AttendanceReports.date, AttendanceReports.month, AttendanceReports.year, AttendanceReports.status, Members.fullName, Members.employerId, Members.departement FROM AttendanceReports JOIN Members ON AttendanceReports.userId = Members.id WHERE AttendanceReports.month='" + req.params.month + "' AND AttendanceReports.year=" + req.params.year + ";",
              {
                type: Sequelize.QueryTypes.SELECT
              }
            )
            .then(result => {
              res.status(200).send({
                message: 'Get attendance reports.',
                data: result
              })
            })
        })
    } catch (error) {
      console.log(error);
    }
  },

  updateOne: async (req, res) => {
    try {
      if (
        !(
          req.user.role === 'Admin' ||
          req.user.role === 'Executive'
        )
      ) {
        res.send({
          message: 'ordinary user cant edit this data'
        })
        return null
      }
      await AttendanceReports
        .update(
          {
            status: req.body.status
          },
          {
            where: {
              id: parseInt(req.params.id)

            }
          })
        .then(result => {
          db.sequelize
            .query(
              "SELECT AttendanceReports.date, AttendanceReports.month, AttendanceReports.year, AttendanceReports.status, Members.fullName, Members.employerId, Members.departement FROM AttendanceReports JOIN Members ON AttendanceReports.userId = Members.id WHERE AttendanceReports.month='" + req.params.month + "' AND AttendanceReports.year=" + req.params.year + ";",
              {
                type: Sequelize.QueryTypes.SELECT
              }
            )
            .then(result => {
              res.status(200).send({
                message: 'Get attendance reports.',
                data: result
              })
            })
        })
    } catch (error) {
      console.log(error);


    }
  },


}