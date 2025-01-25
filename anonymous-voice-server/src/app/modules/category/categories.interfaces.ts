import { Model } from 'mongoose';

export type ICategories = {
  id:String,
  name:String,

};

export type CategoriesModel = Model<
ICategories,
  Record<string, unknown>
>;

export type ICategoriesFilters = {
  searchTerm?: string;
};
