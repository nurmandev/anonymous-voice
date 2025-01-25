/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import ApiError from '../../../errors/ApiError';
import { IUserDetails } from './userDetails.interface';
import { UserDetails } from './userDetails.model';

const getSingleUserDetails = async (id: string): Promise<IUserDetails | null> => {
  const result = await UserDetails.findOne({ _id:id });
  return result;
};

// const getAllAdmins = async (
//   filters: IUserDetailsFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<IUserDetails[]>> => {
//   // Extract searchTerm to implement search query
//   const { searchTerm, ...filtersData } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const andConditions = [];

//   // Search needs $or for searching in specified fields
//   if (searchTerm) {
//     andConditions.push({
//       $or: adminSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }

//   // Filters needs $and to fullfill all the conditions
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   // Dynamic sort needs  fields to  do sorting
//   const sortConditions: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }

//   // If there is no condition , put {} to give all data
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await Admin.find(whereConditions)
//     .populate('managementDepartment')
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await Admin.countDocuments(whereConditions);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

const updateUserDetails = async (
  id: string,
  payload: Partial<IUserDetails>
): Promise<IUserDetails | null> => {
  const isExist = await UserDetails.findOne({ _id:id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const { name, ...adminData } = payload;

  const updatedStudentData: Partial<IUserDetails> = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUserDetails>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  console.log('updatedStudentData',updatedStudentData)
// const result:any= []
  const result = await UserDetails.findOneAndUpdate({ _id:id }, updatedStudentData, {
    new: true,
  });
  return result;
};

// const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
//   // check if the faculty is exist
//   const isExist = await Admin.findOne({ id });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     //delete student first
//     const student = await Admin.findOneAndDelete({ id }, { session });
//     if (!student) {
//       throw new ApiError(404, 'Failed to delete student');
//     }
//     //delete user
//     await User.deleteOne({ id });
//     session.commitTransaction();
//     session.endSession();

//     return student;
//   } catch (error) {
//     session.abortTransaction();
//     throw error;
//   }
// };

export const UserDetailsService = {
  getSingleUserDetails,
  updateUserDetails,
};
