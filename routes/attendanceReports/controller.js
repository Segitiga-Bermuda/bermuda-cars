const { AttendanceReports } = require("../../db/models");
const Sequelize = require('sequelize')
const db = require("../../db/models");
module.exports = {
    addReport: (req, res) => {
        try {
            let currentDate = new Date();
      
            if (
                currentDate.getDay() === 0 || 
                currentDate.getDay() === 6
            ) {
                res.send({ message: "This is weekend." });
            }

            if (
                currentDate.getHours() < 6 || 
                currentDate.getHours() > 16
            ) {
                res.send({ message: "You Are Late " });
            } else {
                let now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
                
                console.log(now)
                
                try {
                    AttendanceReports
                        .findAll({
                            where: {
                                date: Sequelize.where(Sequelize.col('date'), "=",now),
                                userId: req.user.id,
                            }
                        })
                        .then(result => {
                            console.log(result);
                            
                            if(result.length > 0) {
                                res.send({
                                    message: 'You have been check in today.'
                                })

                                return null
                            }
        
                            AttendanceReports
                                .create({
                                    userId: req.user.id,
                                    status: req.body.status,
                                    date: now
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
                                .catch (error => {
                                    console.log(error);
                                })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } catch(error) {
                    console.log(error)
                }
            } 
        } catch(error) {
            console.log(error)
        }
    },

    getAll: (req, res) => {
        try {
          db.sequelize
            .query(
              "SELECT fullName, employerId, departement, role, date, status FROM AttendanceReports JOIN Members ON AttendanceReports.userId = Members.id",
              { type: Sequelize.QueryTypes.SELECT }
              
            )
            .then(result => {
              console.log(result);
                res.status(200).send({
                  message: "Get all datas.",
                  data: result
                  
             });
            })
            .catch(error => console.log(error));
        } catch (error) {
          console.log(error);
        }
    
    
    
    
      },



}