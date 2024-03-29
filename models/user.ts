import mongoose from "mongoose";
import { IUser } from "../types/User";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    filename: {
      type: String,
      default: "learning-management-system/assets/default-avatar_hk6j0v",
    },
    path: {
      type: String,
      default:
        "https://res.cloudinary.com/dsjrdrewd/image/upload/v1676885960/learning-management-system/assets/default-avatar_hk6j0v.png",
    },
  },
  type: {
    type: String,
    required: true,
    enum: ["Student", "Teacher"],
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  quizzes: {
    pending: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
    completed: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Quiz",
        },
        score: Number,
      },
    ],
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
