const { body } = require("express-validator");
const { validationResult } = require("express-validator");

exports.loginValidator = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

     // error check middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.adminValidator = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

     // error check middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.signupValidator = [
    body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
    body("phonenumber")
    .notEmpty().withMessage("Phone number is required")
    .isMobilePhone().withMessage("Invalid phone number"),
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
        // error check middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      } 
];