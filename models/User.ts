import { Schema, model } from "mongoose";
import { RegisterPayload } from "../types/auth";

const userSchema: Schema<RegisterPayload> = new Schema<RegisterPayload>({
  profilePic: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    required: [true, "Pls provide an email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
});

const User = model<RegisterPayload>("User", userSchema);

export default User;
