import { Schema, model } from 'mongoose';

import { CategoriesModel, ICategories } from './categories.interfaces';

const CategoriesSchema = new Schema<
ICategories,
  CategoriesModel
>(
  {
    id:{
      type: String,
      required: true,
    },
    
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Categories = model<ICategories, CategoriesModel>(
  'Categories',
  CategoriesSchema
);

