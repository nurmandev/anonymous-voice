import { Schema, model } from 'mongoose';

import { INotification, NotificationModel } from './notification.interfaces';

const NotificationSchema = new Schema<
  INotification,
  NotificationModel
>(
  {

    createdBy:{
      type: Schema.Types.ObjectId,
      ref:'UserDetails',
    },
    receiver:{
      type: Schema.Types.ObjectId,
      ref:'UserDetails',
    },
    
    type: {
      type: String,
  
     
    },
    content: {
      type: String,
      required: true,
     
    },
    isSeen: {
      type: Boolean,
      
    },
    adminAcknowledgement: {
      type: Boolean,
      
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Notification = model<INotification, NotificationModel>(
  'Notification',
  NotificationSchema
);
