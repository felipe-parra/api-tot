const Store = require("../models/Store");

exports.allStores = async (req, res) => {
  const stores = await Store.find();
  res.status(200).json(stores);
};

exports.createStore = async (req, res) => {
  const { name, location, address } = req.body;

  await Store.create({ name, location, address });
  res.redirect("/api/order");
};

exports.updateStore = async (req, res) => {
  const { id } = req.body;
  await Store.findByIdAndUpdate(id, { ...req.body });
  res.redirect("/api/order");
};
