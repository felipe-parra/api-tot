const router = require("express").Router();
const Store = require("../models/Store");
// CRUD

// Read, list all stores

router.get("/", (req, res) => {
  Store.find()
    .then(stores => {
      res.status(200).json(stores);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.get("/:id", (req, res) => {
  Store.findById(req.params.id)
    .then(store => {
      res.status(200).json(store);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

// Create, create a store
router.post("/create", (req, res) => {
  Store.create({ ...req.body })
    .then(store => {
      res.status(200).json(store);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Update, update a store
router.patch("/edit/:id", (req, res) => {
  const { id } = req.params;

  Store.findOneAndUpdate(id, req.body, { new: true })
    .then(store => {
      res.status(200).json(`Updated Store ${store.name}`);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

// Delete, delete a store
router.delete("/delete/:id/:pass", (req, res) => {
  const { id, pass } = req.params;

  if (pass !== process.env.SECRET_PASS)
    return res.status(401).json("Error: Unauthorized");

  Store.findByIdAndDelete(id)
    .then(store => {
      res.status(200).json(`Store ${store.name} was deleted`);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
