import { Model } from "mongoose";

export type IUserDetails = {
  age: number;
  name?: string;
  userName?: string;
  profileImage?: string;
  dateOfBirth?: string;
  email?: string;
  contactNo?: string;
  gender: "male" | "female";
};

export type UserDetailsModel = Model<IUserDetails, Record<string, unknown>>;

export type IUserDetailsFilters = {
  searchTerm?: string;
  userName?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: "male" | "female";
  managementDepartment?: string;
  designation?: string;
};
