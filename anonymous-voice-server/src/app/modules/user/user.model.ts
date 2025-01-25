/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

import config from "../../../config";
import { IUser, UserModel } from "./user.interface";

const UserSchema = new Schema<IUser, UserModel>(
  {
    // id: {
    //   type: String,
    //   // required: true,
    //   unique: true,
    // },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "offline",
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    // email: {
    //   type: String,
    //   // unique: true,
    //   // required: true,
    // },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },

    userDetails: {
      type: Schema.Types.ObjectId,
      ref: "UserDetails",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.statics.isUserExist = async function (
  userName: string
): Promise<IUser | null> {
  return await User.findOne(
    { userName },
    {
      password: 1,
      role: 1,
      needsPasswordChange: 1,
      userDetails: 1,
      isVerified: 1,
    }
  ).populate("userDetails");
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.methods.changedPasswordAfterJwtIssued = function (
  jwtTimestamp: number
) {
  console.log({ jwtTimestamp }, "hi");
};

// User.create() / user.save()
UserSchema.pre("save", async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );

  if (!user.needsPasswordChange) {
    user.passwordChangedAt = new Date();
  }

  next();
});

export const User = model<IUser, UserModel>("User", UserSchema);

// interface IImage {
//   name: string;
//   image: {
//     data:Buffer,
//     contentType:String
//   }
// }

// const ImageSchema = new Schema<IImage>(
//   {
//     name: {
//       type: String,
//       required: true,

//     },
//     image: {
//       data:Buffer,
//       contentType:String
//     },
//   }
// );

// export const ImageUpload =model<IImage>('ImageModel', ImageSchema);
