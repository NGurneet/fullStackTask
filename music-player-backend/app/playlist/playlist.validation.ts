import { body } from "express-validator";

export const createPlaylist = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  body("createdBy")
    .notEmpty()
    .withMessage("createdBy is required")
    .isString()
    .withMessage("createdBy must be a string"),
  body("ref"),
  body("songs"),
  body("Ref"),
];

export const updatePlaylist = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  body("createdBy")
    .notEmpty()
    .withMessage("createdBy is required")
    .isString()
    .withMessage("createdBy must be a string"),
  body("ref"),
  body("songs"),
  body("Ref"),
];

export const editPlaylist = [
  body("name").isString().withMessage("name must be a string"),
  body("createdBy").isString().withMessage("createdBy must be a string"),
  body("ref"),
  body("songs"),
  body("Ref"),
];
