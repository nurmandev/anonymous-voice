import { Model } from 'mongoose';

export type IBlog = {
  blogId:String,
  blogTitle:String,
  featuredImage: String,
  content: String,
  author: String,
  blogType:"featured"|"regular"
  blogStatus:"draft"|"published",
  blogCategory:String,
  blogSlug:String,
};

export type BlogModel = Model<
IBlog,
  Record<string, unknown>
>;

export type IBlogFilters = {
  searchTerm?: string;
};
