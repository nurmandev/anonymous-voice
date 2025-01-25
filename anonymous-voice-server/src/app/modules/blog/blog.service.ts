
import mongoose, { SortOrder } from 'mongoose';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IBlog, IBlogFilters } from './blog.interfaces';
import { Blog } from './blog.model';

const createBlog = async (payload: IBlog) => {

const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // const id = await generateOrderId();
    const id = "123456789"
    payload.blogId = id;
    const result = await Blog.create(payload);
   
    await session.commitTransaction();
    await session.endSession();
    return result
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
    
  }
};

const getSingleBlog = async (
  id: string
): Promise<IBlog | null> => {

    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      // If the parameter is a valid MongoDB ObjectId, use findById
      return await Blog.findById(id);
    } else {
      // If not, assume it's a slug and use findOne
      return await Blog.findOne({ blogSlug: id });
    }
 
};
// const getSingleBlogBySlug = async (
//   slug: string
// ): Promise<IBlog | null> => {
//   const result = await Blog.findOne({blogSlug:slug});
//   return result;
// };

const getAllBlogs = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBlog[]>> => {
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
  const result = await Blog.find(whereConditions).populate('author')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Blog.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBlogFromDB = async (
  id: string
): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlogFromDB

};
