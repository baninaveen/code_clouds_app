const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Attribute Schema
const AttributeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Attribute = mongoose.model("Attribute", AttributeSchema);

module.exports = Attribute;
