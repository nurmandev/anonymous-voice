import { SortOrder } from 'mongoose';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { messagingFilterableFields } from './messaging.constants';
import { INotification, INotificationFilters } from './notification.interfaces';
import { Notification } from './notification.model';

const createNotification = async (payload: INotification ) => {
  const result = await Notification.create(payload);
  return result;
};

const getSingleMessage = async (
  id: string
): Promise<INotification | null> => {
  const result = await Notification.findById(id);
  return result;
};

const getAllNotification = async (
  filters: INotificationFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<INotification[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: messagingFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
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

  const result = await Notification.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  
 let unseenNotifications;
  const total = await Notification.countDocuments(whereConditions);
      if (filtersData?.receiver){
           unseenNotifications = await Notification.countDocuments({  isSeen: false,receiver:filtersData.receiver }  );}
    else 
      { 
         unseenNotifications = await Notification.countDocuments({ adminAcknowledgement:false } );
      }
  return {
    meta: {
      page,
      limit,
      total,
      
      
    },
    data:{result:result,unseenNotifications}
      
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
const updateNotificationSeenStatus = async (
  receiver: string,
 
): Promise<INotification | null> => {
  let result
   
if(receiver){
   result = await Notification.updateMany({
    $and: [
      { receiver: { $eq: receiver } },
      // { sentBy: { $ne: userId } }
    ]
  }, {
    $set: { isSeen: true }
  });}
  else {
    
     result = await Notification.updateMany({
      $and: [
        { adminAcknowledgement: { $eq: false } },
        // { sentBy: { $ne: userId } }
      ]
    }, {
      $set: { adminAcknowledgement: true }
    });
  }


  return result as any;
};



export const NotificationService = {
createNotification,
  getSingleMessage,
  getAllNotification,
  updateNotificationSeenStatus,
};
