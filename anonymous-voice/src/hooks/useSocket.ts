// "use client";

// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// export function useSocket(username: string) {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
//       console.error("Socket URL not configured");
//       return;
//     }

//     const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
//       auth: { username },
//       transports: ["websocket"],
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [username]);

//   return { socket };
// }
