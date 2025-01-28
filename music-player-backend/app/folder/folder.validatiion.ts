import { body } from "express-validator";

// Validation for creating a folder
export const createFolder = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  body("parentId")
    .optional()
    .isString()
    .withMessage("parentId must be a string if provided"),
  body("isPublic")
    .optional()
    .isBoolean()
    .withMessage("isPublic must be a boolean if provided"),
];

// Validation for updating a folder
export const updateFolder = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  body("parentId")
    .optional()
    .isString()
    .withMessage("parentId must be a string if provided"),
  body("isPublic")
    .optional()
    .isBoolean()
    .withMessage("isPublic must be a boolean if provided"),
];

// Validation for editing folder details (partial updates)
export const editFolder = [
  body("name")
    .optional()
    .isString()
    .withMessage("name must be a string if provided"),
  body("parentId")
    .optional()
    .isString()
    .withMessage("parentId must be a string if provided"),
  body("isPublic")
    .optional()
    .isBoolean()
    .withMessage("isPublic must be a boolean if provided"),
];
