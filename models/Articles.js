const { model, Schema } = require("mongoose");

const artcileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 36,
      unique: true
    },
    barcode: {
      type: String,
      min: 3,
      max: 128,
      trim: true,
      unique: true
    },
    equivalencys: {
      type: [String]
    },
    categories: {
      type: String,
      required: false
      // OnProd
      // required: true,
    },
    prices: {
      saleUnit: {
        type: Number
      },
      storeUnit: {
        type: Number
      }
    }
  },
  {
    timestamps: true
  }
);
