import { body } from "express-validator";

export const createSong = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),
  body("artist")
    .notEmpty()
    .withMessage("artist is required")
    .isString()
    .withMessage("artist must be a string"),
  body("album").isString().withMessage("album must be a string"),
  body("genre").isString().withMessage("genre must be a string"),
  body("lyrics").isString().withMessage("lyrics must be a string"),
  body("songUrl")
    .notEmpty()
    .withMessage("songUrl is required")
    .isString()
    .withMessage("songUrl must be a string"),
  body("playlistId").isString().withMessage("playlistId must be a string"),
  body("size")
    .notEmpty()
    .withMessage("size is required")
    .isNumeric()
    .withMessage("size must be a number"),
];

export const updateSong = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),
  body("artist")
    .notEmpty()
    .withMessage("artist is required")
    .isString()
    .withMessage("artist must be a string"),
  body("album").isString().withMessage("album must be a string"),
  body("genre").isString().withMessage("genre must be a string"),
  body("lyrics").isString().withMessage("lyrics must be a string"),
  body("songUrl")
    .notEmpty()
    .withMessage("songUrl is required")
    .isString()
    .withMessage("songUrl must be a string"),
  body("playlistId").isString().withMessage("playlistId must be a string"),
  body("size")
    .notEmpty()
    .withMessage("size is required")
    .isNumeric()
    .withMessage("size must be a number"),
];

export const editSong = [
  body("title").isString().withMessage("title must be a string"),
  body("artist").isString().withMessage("artist must be a string"),
  body("album").isString().withMessage("album must be a string"),
  body("genre").isString().withMessage("genre must be a string"),
  body("lyrics").isString().withMessage("lyrics must be a string"),
  body("songUrl").isString().withMessage("songUrl must be a string"),
  body("playlistId").isString().withMessage("playlistId must be a string"),
  body("size").isNumeric().withMessage("size must be a number"),
];
