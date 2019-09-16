const Order = require("../models/Order");
const Store = require("../models/Store");
const User = require("../models/User");

exports.CreateOrderForm = async (req, res) => {
  const users = await User.find();
  res.render("create-order", { users });
};

exports.createOrder = async (req, res) => {
  await Order.create({ ...req.body });
  res.redirect("/");
};
