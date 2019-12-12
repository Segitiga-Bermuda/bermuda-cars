const { Inventories } = require("../../db/models")
// jwt = require('jsonwebtoken'),
// {
//     JWT_SECRET_KEY
// } = require('../../config')


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

  getById: async (req, res) => {
    // const user = jwt.verify(req.get("X-API-KEY"), JWT_SECRET_KEY);
    try {
      await Inventories
      .findAll({
        where: {
          id: req.params.id
          // id: user.id
        }
      })
      .then(result => {
        res.send({
          message: "Get data by id.",
          data: result
        });
      });
    } catch (error) {
      qconsole.log(error);
    }
  },

  addOne: async (req, res) => {
    // const user = jwt.verify(req.get("X-API-KEY"), JWT_SECRET_KEY);

    try {
     await Inventories
     .create({
        id: id,
        // id: user.id,
        item: req.body.item,
        price: req.body.price,
        materialCost: req.body.materialCost,
        laborCost: req.body.laborCost,
        overheadCost: req.body.overheadCost
      })
      .then(result => {
        Inventories;
        res.send({
          message: "Data is successfully added.",
          data: result
        });
      });
    } catch (error) {
      qconsole.log(error);
    }
  },

updateOne: async (req, res) => {
      // const user = jwt.verify(req.get("X-API-KEY"), JWT_SECRET_KEY);  
  try {
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
                id: parseInt(req.params.id),
            
            }
        })
        .then(result => {
            res.send({
                message: 'Data is successfully updated.',
                data: result
            })
        })
    } catch (error) {
        console.log(error);
        
        
    }
},
deleteOne: async (req, res) => {
  // const user = jwt.verify(req.get('X-API-KEY'), JWT_SECRET_KEY)

  try {
    await Inventories
    .destroy({
      where: {
        id: parseInt(req.params.id)
      }
    }).then(result => {
      res.send({
        message: "Delete Data",
        data: result
      });
    });
  } catch (error) {
    console.log(error);
  }
},


};



//jwtnya blom dipake 