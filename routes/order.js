const router = require("express").Router();
const Order = require("../models/Order");
const User = require("../models/User");
const Store = require("../models/Store");

router.get("/", (req, res) => {
  Order.find()
    .populate("senderStore", "name")
    .populate("storeOrder", "name")
    .populate("userOrdered", "username")
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});
// router.get('/:storeId', (req, res) => {
//   const {storeId} = req.params
//   Order.find()
//   .then(orders => {
//     res.status(200).json(orders)
//   })
//   .catch(err => {
//     res.status(400).json('Error: ' + err)
//   })
// })

router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .populate("senderStore", "name")
    .populate("storeOrder", "name")
    .populate("userOrdered", "username")
    .then(order => {
      res.status(200).json(order);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.post("/create/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    Order.create({
      ...req.body,
      storeOrder: user.store,
      userOrdered: user._id
    })
      .then(order => {
        res.status(200).json("Created successfully");
      })
      .catch(err => {
        res.status(400).json("Error: " + err);
      });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.patch("/edit/:id", (req, res) => {
  const { id } = req.params;

  Order.findByIdAndUpdate(id, req.body, { new: true })
    .then(order => {
      res.status(200).json("Updated successfully");
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  Order.findOneAndDelete(id)
    .then(() => {
      res.status(200).json("Deleted successfully");
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
