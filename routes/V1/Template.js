const express = require("express");
const httpStatus = require("http-status");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const ApiError = require("../../utils/ApiError");

// Attribute Model
const Template = require("../../models/Template");

// @route GET api/v1/templates
// @desc Get All Templates
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const templates = await Template.find({});
    res.json(templates);
  })
);

// @route GET api/v1/templates/id
// @desc Get Templates by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const template = await Template.findById(req.params.id);
    if (!template) {
      throw new ApiError(httpStatus.NOT_FOUND, "Template not found");
    }
    res.json(template);
  })
);

// @route POST api/v1/template
// @desc Create New  Template
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const attributes = req.body.attribute;
    const newTemplate = new Template({
      name: req.body.name,
      category: req.body.category,
      size: req.body.size,
    });

    attributes.forEach((item) => {
      newTemplate.attributes.push(item);
    });

    const createdTemplate = await newTemplate.save();
    res.status(httpStatus.CREATED).send(createdTemplate);
  })
);

// @route PUT api/v1/template/:id
// @body Payload of updated Template name
// @desc Update Template
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    if (!req.params.id) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Template id should not be valid objectId"
      );
    }

    const template = await Template.findById(req.params.id);

    if (!template) {
      throw new ApiError(httpStatus.NOT_FOUND, "Template not found");
    }

    const attributes = req.body.attribute;
    const updatedTemplate = new Template({
      name: req.body.name,
      category: req.body.category,
      size: req.body.size,
    });

    attributes.forEach((item) => {
      updatedTemplate.attributes.push(item);
    });

    Object.assign(template, updatedTemplate);

    const updatedTemplatePayload = await template.save();
    res.send(updatedTemplatePayload);
  })
);

// @route DELETE api/v1/template/:id
// @desc Delete  Template
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const template = await Template.findById(req.params.id);

    if (!template) {
      throw new ApiError(httpStatus.NOT_FOUND, "Template not found");
    }

    await template.remove();
    res.send({ message: "Template is successfully  deleted" });
  })
);

module.exports = router;
