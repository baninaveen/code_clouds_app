const express = require("express");
const httpStatus = require("http-status");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const ApiError = require("../../utils/ApiError");

// Attribute Model
const Attribute = require("../../models/Attribute");

// @route GET api/v1/attribute
// @desc Get All Arributes
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const attributes = await Attribute.find({});
    res.json(attributes);
  })
);
// @route GET api/v1/attribute/:id
// @desc Get Arributes by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const attribute = await Attribute.findById(req.params.id);

    if (!attribute) {
      throw new ApiError(httpStatus.NOT_FOUND, "Attribute not found");
    }
    res.json(attribute);
  })
);

// @route POST api/v1/attribute
// @desc Create New  Arribute
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newAttribute = new Attribute({
      name: req.body.name,
    });

    const createdAttribute = await newAttribute.save();
    res.status(httpStatus.CREATED).send(createdAttribute);
  })
);

// @route PUT api/v1/attribute/:id
// @body Payload of updated Attribute name
// @desc Update Arribute
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    if (!req.body.name || !req.params.id) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Attribute name should not be empty"
      );
    }

    const attribute = await Attribute.findById(req.params.id);

    if (!attribute) {
      throw new ApiError(httpStatus.NOT_FOUND, "Attribute not found");
    }

    Object.assign(attribute, req.body);

    const updatedAttribute = await attribute.save();
    res.send(updatedAttribute);
  })
);

// @route DELETE api/v1/attribute/:id
// @desc Delete  Arribute
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const attribute = await Attribute.findById(req.params.id);

    if (!attribute) {
      throw new ApiError(httpStatus.NOT_FOUND, "Attribute not found");
    }

    await attribute.remove();
    res.send({ message: "Attribute is successfully  deleted" });
  })
);

module.exports = router;
