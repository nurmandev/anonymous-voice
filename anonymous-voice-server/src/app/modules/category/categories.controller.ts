import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogFilterableFields } from './blog.constants';
import { ICategories } from './categories.interfaces';
import { CategoriesService } from './categories.service';

const createCategories = catchAsync(async (req: Request, res: Response) => {
  const { ...clientOrderData } = req.body;
  const result = await CategoriesService.createCategories(
    clientOrderData
  );
  sendResponse<ICategories>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Blog created successfully',
    data: result,
  });
});

const getSingleCategories = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoriesService.getSingleCategories(id);

  sendResponse<ICategories>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Particular Blog fetched successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, blogFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CategoriesService.getAllCategories(
    filters,
    paginationOptions
  );

  sendResponse<ICategories[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Blogs fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateCategories = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await CategoriesService.updateCategories(id, updatedData);

    sendResponse<ICategories>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order updated successfully',
      data: result,
    });
  })
);

const deleteCategories = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoriesService.deleteCategoriesFromDB(id);

  sendResponse<ICategories>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  });
});

export const CategoriesController = {
  
  createCategories,
  getSingleCategories,
  getAllCategories,
  updateCategories,
  deleteCategories,

};
