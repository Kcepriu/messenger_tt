import Joi from 'joi';

export const schemaAddTodo = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(5).max(1000).required(),
  completed: Joi.boolean().default(false),
  private: Joi.boolean().default(false)
});

export const schemaChangeCompletledTodo = Joi.object({
  completed: Joi.boolean().required()
});

export const schemaChangePrivateTodo = Joi.object({
  private: Joi.boolean().required()
});
