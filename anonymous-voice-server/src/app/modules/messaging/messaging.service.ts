import { SortOrder } from "mongoose";

import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { messagingFilterableFields } from "./messaging.constants";
import { IMessage, IMessageFilters } from "./messaging.interfaces";
import { Message } from "./messaging.model";

const createMessage = async (payload: IMessage) => {
  const result = await Message.create(payload);
  return result;
};

const getSingleMessage = async (id: string): Promise<IMessage | null> => {
  const result = await Message.findById(id);
  return result;
};

const getAllMessages = async (
  filters: IMessageFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IMessage[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: messagingFilterableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
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

  const result = await Message.find(whereConditions)
    .populate("sentBy")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Message.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// const updateFaculty = async (
//   id: string,
//   payload: Partial<IAcademicFaculty>
// ): Promise<IAcademicFaculty | null> => {
//   const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   });
//   return result;
// };

// const deleteByIdFromDB = async (
//   id: string
// ): Promise<IAcademicFaculty | null> => {
//   const result = await AcademicFaculty.findByIdAndDelete(id);
//   return result;
// };
const updateMessageSeenStatus = async (
  userName: string
): Promise<IMessage | null> => {
  // const result = await Message.findOneAndUpdate({ orderId: orderId },{sentBy:userId},  {
  //   new: true,
  // });

  // const result= await Message.updateMany({orderId:{$eq:orderId }},
  //   {isSeen:true});
  const result = await Message.updateMany(
    {
      $and: [
        // { orderId: { $eq: orderId } },
        { sentBy: { $ne: userName } },
      ],
    },
    {
      $set: { isSeen: true },
    }
  );

  return result as any;
};

export const MessagingService = {
  createMessage,
  getSingleMessage,
  getAllMessages,
  updateMessageSeenStatus,
};
