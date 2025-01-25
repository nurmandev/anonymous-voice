import { Model } from 'mongoose';

export type INotificationShared = Pick<INotification, 'createdBy' | 'receiver' | 'type'>;
export type INotification = {
  createdBy: String;
  receiver: String;
  content: String;
  type: String;
  isSeen: boolean;
  adminAcknowledgement: boolean;

};

export type NotificationModel = Model<
  INotification,
  Record<string, unknown>
>;

export type INotificationFilters = {
  searchTerm?: string;
};
