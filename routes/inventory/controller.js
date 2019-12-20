const { Inventories } = require("../../db/models")


module.exports = {
  getAll: async (req, res) => {
    try {
      await Inventories
        .findAll({})
        .then(result => {
          res.status(200).send({
            message: "Get all datas.",
            data: result
          });
        });
    } catch (error) {
      console.log(error);
    }
  },


  addOne: async (req, res) => {
    try {
      if (
        !(
          req.user.role === 'Admin' ||
          req.user.role === 'Executive' ||
          req.user.role === 'Employee'
        )
      ) {
        res.send({
          message: 'ordinary user cant edit this data'
        })
        return null
      }

      await Inventories
        .create({
          item: req.body.item,
          price: req.body.price,
          materialCost: req.body.materialCost,
          laborCost: req.body.laborCost,
          overheadCost: req.body.overheadCost,
          color: req.body.color,
          profit: parseInt(req.body.price) - parseInt(req.body.materialCost) - parseInt(req.body.laborCost) - parseInt(req.body.overheadCost),
          totalCost: parseInt(req.body.materialCost) + parseInt(req.body.laborCost) + parseInt(req.body.overheadCost)
        })
        .then(result => {
          Inventories
            .findAll({})
            .then(result2 => {
              res.send({
                message: 'Data is successfully added.',
                data: result2
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
      await Inventories
        .update(
          {
            item: req.body.item,
            price: req.body.price,
            materialCost: req.body.materialCost,
            laborCost: req.body.laborCost,
            overheadCost: req.body.overheadCost
          },
          {
            where: {
              id: parseInt(req.params.id)

            }
          })
        .then(result => {
          Inventories
            .findAll({})
            .then(result2 => {
              res.send({
                message: 'Data is successfully updated.',
                data: result2
              })
            })
        })
    } catch (error) {
      console.log(error);


    }
  },
  deleteOne: async (req, res) => {

    try {
      if (!(
        req.user.role === 'Admin' ||
        req.user.role === 'Executive'
      )
      ) {
        res.send({
          message: 'ordinary user cant edit this data'
        })
        return null
      }
      await Sales
        .destroy({
          where: {
            id: parseInt(req.params.id),
          }
        }).then(result => {
          Inventories
            .findAll({})
            .then(result2 => {
              res.send({
                message: 'Data is successfully deleted.',
                data: result2
              })
            })
        })
    } catch (error) {
      console.log(error);
    }
  },


};