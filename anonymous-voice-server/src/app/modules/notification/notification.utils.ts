import { INotificationShared } from "./notification.interfaces";
import { Notification } from "./notification.model";

export const createNotificationAlert = async (payload:any): Promise<string | undefined|INotificationShared> => {
    const notificationType:  Record<string, string>   = {
        ORDER: 'Your order has been placed successfully',
        ORDER_UPDATED: 'Your order has been updated',

    }
    payload.content =  notificationType[payload.type]


    const notification = await Notification.create({createdBy: payload.orderBy, receiver: payload.orderBy, type: 'ORDER', content:payload.content , isSeen: false})
    // const lastFaculty = await ClientOrder.findOne({},{ orderId: 1, _id: 0 })
    //   .sort({
    //     createdAt: -1,
    //   })
    //   .lean();
  
    return notification;
  };