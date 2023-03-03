import Joi from "joi";

export const postSchema = Joi.object({
  content: Joi.string().required(),
  likes: Joi.array().items({
    name: Joi.string().required(),
    date: Joi.date().required(),
  }),
  comments: Joi.array().items({
    name: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.date().required(),
  }),
  rooms: Joi.array().items(
    Joi.object({
      value: Joi.string().required(),
      label: Joi.string().required(),
    }).required()
  ),
});

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  type: Joi.string().valid("Student").valid("Teacher").required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const createRoomSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
});

export const roomLinkSchema = Joi.object({
  attendance: Joi.string().allow("").uri().optional(),
  meeting: Joi.string().allow("").uri().optional(),
});