import Joi from "joi";
import { emailRegExp } from "../constants/regExp.constants";

export const schemaAuthorize = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(5).max(15).required(),
});

export const schemaRegistration = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  name: Joi.string().min(5).max(15).required(),
  password: Joi.string().min(5).max(15).required(),
  confirmPassword: Joi.string().min(5).max(15).required(),
});
