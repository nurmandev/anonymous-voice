/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';

interface IImage {
  name: string;
  image: {
    data:Buffer,
    contentType:String
  }
}

const ImageSchema = new Schema<IImage>(
  {
    name: {
      type: String,
      required: true,
   
    },
    image: {
      data:Buffer,
      contentType:String
    },
  }
);

export const ImageUpload =model<IImage>('ImageModel', ImageSchema);


