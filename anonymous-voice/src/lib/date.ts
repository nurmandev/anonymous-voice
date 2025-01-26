// export const formatDateToLocale = (dateString: string | null): string => {
//   if (!dateString) return "Selected date";
//   return new Date(dateString).toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// };

// export const calculateValidity = (): string => {
//   const now = new Date();
//   const validUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000);
//   const diffInMs = validUntil.getTime() - now.getTime();
//   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//   const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
//   return `${diffInHours}h : ${diffInMinutes}min`;
// };

// export const formatTimeForAppointment = (): string => {
//   const now = new Date();
//   const endTime = new Date(now.getTime() + 60 * 60 * 1000);

//   const formatTime = (date: Date) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     return `${formattedHours}:${minutes.toString().padStart(2, "0")}${ampm}`;
//   };

//   return `${formatTime(now)}-${formatTime(endTime)}`;
// };

export const formatTimeForAppointment = (
  sessionType: string,
  duration: string = "10",
): string => {
  if (sessionType === "Chat" || sessionType === "Quick Call") {
    return `${duration} minutes`;
  }

  const now = new Date();
  const endTime = new Date(now.getTime() + parseInt(duration) * 60 * 1000);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")}${ampm}`;
  };

  return `${formatTime(now)}-${formatTime(endTime)}`;
};

export const formatDateToLocale = (dateString: string | null): string => {
  if (!dateString) return "Selected date";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const calculateValidity = (): string => {
  const now = new Date();
  const validUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const diffInMs = validUntil.getTime() - now.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffInHours}h : ${diffInMinutes}min`;
};
