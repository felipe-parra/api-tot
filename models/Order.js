const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    storeOrder: {
      type: Schema.Types.ObjectId,
      ref: "Store"
      // required: true
    },
    senderStore: {
      type: Schema.Types.ObjectId,
      ref: "Store"
      // required: true
    },
    userOrdered: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    articles: {
      type: String,
      min: 3
    },
    pictureUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);
