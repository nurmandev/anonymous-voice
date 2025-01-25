import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogFilterableFields } from './blog.constants';
import { IBlog } from './blog.interfaces';
// import { IClientOrder } from './blog.interfaces';
import { BlogService } from './blog.service';
// import { clientOrderFilterableFields } from './clientOrder.constants';
// import { ClientServicesService } from './clientOrder.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { ...clientOrderData } = req.body;
  const result = await BlogService.createBlog(
    clientOrderData
  );
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New Blog created successfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.getSingleBlog(id);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Particular Blog fetched successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, blogFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BlogService.getAllBlogs(
    filters,
    paginationOptions
  );

  sendResponse<IBlog[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Blogs fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateBlog = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await BlogService.updateBlog(id, updatedData);

    sendResponse<IBlog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order updated successfully',
      data: result,
    });
  })
);

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlogFromDB(id);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getSingleBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,

};
