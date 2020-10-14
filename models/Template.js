const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attribute = require("./Attribute");

AttributeSchema = mongoose.model("Attribute").schema;

// Create Template Schema
const TemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    attributes: [AttributeSchema],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model("Template", TemplateSchema);

module.exports = Template;
