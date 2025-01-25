
import mongoose, { SortOrder } from 'mongoose';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICategories, ICategoriesFilters } from './categories.interfaces';
import { Categories } from './categories.model';

;

const createCategories = async (payload: ICategories) => {

const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // const id = await generateOrderId();
    const id = "123456789"
    payload.id = id;
    const result = await Categories.create(payload);
   
    await session.commitTransaction();
    await session.endSession();
    return result
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
    
  }
};

const getSingleCategories = async (
  id: string
): Promise<ICategories | null> => {

  
  
      return await Categories.findById(id);

 
};
// const getSingleBlogBySlug = async (
//   slug: string
// ): Promise<IBlog | null> => {
//   const result = await Blog.findOne({blogSlug:slug});
//   return result;
// };

const getAllCategories = async (
  filters: ICategoriesFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICategories[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions:any = [];

  // Search needs $or for searching in specified fields
  // if (searchTerm) {
  //   andConditions.push({
  //     $or: academicFacultySearchableFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     })),
  //   });
  // }

  // Filters needs $and to fullfill all the conditions
  // console.log("filtersData",filtersData)
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

    console.log(whereConditions)
  const result = await Categories.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Categories.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateCategories = async (
  id: string,
  payload: Partial<ICategories>
): Promise<ICategories | null> => {
  const result = await Categories.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCategoriesFromDB = async (
  id: string
): Promise<ICategories | null> => {
  const result = await Categories.findByIdAndDelete(id);
  return result;
};

export const CategoriesService = {
  createCategories,
  getSingleCategories,
  getAllCategories,
  updateCategories,
  deleteCategoriesFromDB,
};
