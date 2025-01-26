import React from "react";

interface Notification {
  id: number;
  message: string;
}

export default function Notifications() {
  const notifications: Notification[] = []; // Replace with actual notifications data

  return (
    <div className="w-full px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-violet mb-12">
          Notifications
        </h1>
        {notifications.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p className="">You have no notifications at the moment.</p>
            <p className="text-xs mt-2">
              Check back later for updates and notifications.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 bg-white shadow rounded-lg"
              >
                {notification.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
