const { model, Schema } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 255,
      trim: true
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store"
      // type: String,
      // required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(PLM, { usernameField: "username" });

module.exports = model("User", userSchema);
