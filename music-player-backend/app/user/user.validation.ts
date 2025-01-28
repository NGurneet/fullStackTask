import { body } from "express-validator";

// Validation for creating a user
export const createUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("active").optional().isBoolean().withMessage("Active must be a boolean"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
  body("role")
    .optional()
    .isIn(["USER", "ADMIN"])
    .withMessage("Role must be either 'USER' or 'ADMIN'"),
];

// Validation for updating a user
export const updateUser = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("active").optional().isBoolean().withMessage("Active must be a boolean"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string"),
  body("role")
    .optional()
    .isIn(["USER", "ADMIN"])
    .withMessage("Role must be either 'USER' or 'ADMIN'"),
];

// Validation for editing a user (partial updates)
export const editUser = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("active").optional().isBoolean().withMessage("Active must be a boolean"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string"),
];

// Validation for logging in a user
export const loginUser = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
];
