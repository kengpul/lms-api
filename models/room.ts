import { string } from "joi";
import mongoose, { SchemaType } from "mongoose";
import { IRoom } from "../types/Room";
const { Schema } = mongoose;

const userObject = [
  {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
];

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  teachers: userObject,
  students: userObject,
  pending: userObject,
  link: {
    attendance: {
      type: String,
      default: "",
    },
    meeting: {
      type: String,
      default: "",
    },
  },

  quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
});

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;
