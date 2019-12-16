const { Inventory, Sales } = require("../../db/models");
const Sequelize = require("sequelize");
const db = require("../../db/models");

module.exports = {
  getGross: (req, res) => {
    try {
      db.sequelize
        .query(
          "SELECT itemId,sold, unsold, price, materialCost, laborCost, overheadCost, month, year, item FROM Sales JOIN Inventories ON Sales.itemId = Inventories.id",
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
};
