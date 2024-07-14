import Joi from "joi";

export const schemaAddChat = Joi.object({
  message: Joi.string().min(5).max(1000).required(),
  status: Joi.string().valid("send", "created", "edit"),
});

export const schemaEditChat = Joi.object({
  id: Joi.string().min(5).max(100).required(),
  message: Joi.string().min(5).max(1000).required(),
  owner: Joi.string().min(5).max(100).required(),
  recipient: Joi.string().min(5).max(100).required(),
  status: Joi.string().valid("send", "created", "edit").required(),
});
