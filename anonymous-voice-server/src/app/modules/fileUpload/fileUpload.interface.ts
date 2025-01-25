/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

import { IUserDetails } from '../userDetails/userDetails.interface';

export type IUser = {
  id?: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  userDetails?: Types.ObjectId | IUserDetails;
  email?:string;
};
export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'male' | 'female';
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  designation: string;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'password' | 'role' | 'needsPasswordChange'|'email'|'userDetails'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
};
