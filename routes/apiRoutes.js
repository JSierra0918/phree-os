const db = require('../models');
const reset = "\x1b[0m";
const cyan = "\x1b[36m";

module.exports = function (app) {
  // Get all examples
  app.get("/api/user/:id", function (req, res) {
    const idInput = req.params.id;
    db.User.findOne({
      where: {
        id: idInput
      }
    }).then(function (user) {
      res.json(user);
    });
  });

  app.get("/api/category/:id", function (req, res) {
    const idInput = req.params.id;
    db.Category.findAll({
      where: {
        UserId: idInput
      }
    }).then(function (categories) {
      res.json(categories);
    });
  });

  //display category selected
  app.get("/api/category/one/:id", function (req, res) {
    const idInput = req.params.id;
    db.Category.findOne({
      where: {
        id: idInput
      }
    }).then(function (categories) {
      res.json(categories);
    });
  });

  //get item based off of category ID
  app.get("/api/items/:id", function (req, res) {
    const idInput = req.params.id;
    db.Item.findAll({
      where: {
        CategoryID: idInput
      }
    }).then(function (items) {
      res.json(items);
    });
  });

  //grab specific Items
  app.get("/api/items/one/:id", function (req, res) {
    const idInput = req.params.id;
    db.Item.findOne({
      where: {
        id: idInput
      }
    }).then(function (items) {
      res.json(items);
    });
  });


  // Create a new user
  app.post("/api/user", function (req, res) {
    console.log(`${cyan}about to call db.User.create...${reset}`)
    db.User.create(req.body).then(function (dbUsers) {
      console.log('dbUsers:', dbUsers)

      console.log(`${cyan}==> Created A New User - ${req.body.Username}${reset}`)
      res.json(dbUsers);
    });
  });

  // Create a a summary
  app.post("/api/summary/:id", (req, res) => {
    const idInput = req.params.id;
    console.log(req.body)
    res.json(req.body)
  });


// Update items after the client has sold.
  app.put("/api/items/one/:id", function (req, res) {
    const idInput = req.params.id;
    console.log('req.body:', req.body)
    //subtract the items quantity by the req.body

    db.Item.update(
      {
        quantity: req.body.Quantity
      },{
      where: {  
        id: idInput
      }
    }).then(function (updatedItem) {
      res.json(updatedItem);
    });
  });

  // Create a 
  app.post("/api/category/:id", (req, res) => {
    const cat = {
      UserId: req.body.UserId,
      categoryName: req.body.categoryName     
    }

    console.log(req.body);
    db.Category.create(cat).then((catResponse)=>{
      res.json(catResponse)
    });
  });


}