import { check } from "express-validator";
import { validationResult } from "express-validator";

export const useValidator = check("username")
  .not()
  .isEmpty()
  .withMessage("Name must have more than 5 characters");

export function validate(req, res, next) {
  const error = validationResult(req).array();
  if (!error) {
    next();
  }
}
import { check } from "express-validator";
import { validationResult } from "express-validator";

export const useValidator = check("username")
  .not()
  .isEmpty()
  .withMessage("Name must have more than 5 characters");

export function validate(req, res, next) {
  const error = validationResult(req).array();
  if (!error) {
    next();
  }
}
