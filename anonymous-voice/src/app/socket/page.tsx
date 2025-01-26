// "use client";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// import { AuthService } from "@/services/auth.service";

// const Home = () => {
//   const currentActiveUser = AuthService.getStoredUser();
//   const [socket, setSocket] = useState(null);
//   const [currentUser, setCurrentUser] = useState({
//     username: currentActiveUser?.userName,
//   });
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messageInput, setMessageInput] = useState("");

//   // Initialize socket when user is selected
//   useEffect(() => {
//     if (currentUser) {
//       const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
//         auth: {
//           username: currentUser.username,
//         },
//       });

//       setSocket(newSocket);

//       // Listen for user list updates
//       newSocket.on("users", (userList) => {
//         setUsers(userList);
//       });

//       // Listen for private messages
//       newSocket.on("private message", (data) => {
//         console.log("Received private message:", data);
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             from: data.from,
//             fromUsername: data.fromUsername,
//             message: data.message,
//           },
//         ]);
//       });

//       // Listen for message sent confirmation
//       newSocket.on("message sent", (data) => {
//         console.log("Message sent successfully to:", data.to);
//       });

//       // Listen for private message errors
//       newSocket.on("private message error", (error) => {
//         console.error("Private message error:", error);
//       });

//       // Cleanup on component unmount
//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [currentUser]);

//   // User selection handler
//   const handleUserSelection = (user) => {
//     console.log("Selected user:", user);
//     setCurrentUser(user);
//   };

//   const sendPrivateMessage = () => {
//     if (socket && selectedUser && messageInput.trim()) {
//       socket.emit("private message", {
//         to: selectedUser.username, // Send username
//         message: messageInput,
//       });

//       // Add the message to the local state
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           from: socket.id,
//           fromUsername: currentUser.username,
//           message: messageInput,
//         },
//       ]);

//       setMessageInput("");
//     }
//   };

//   // If no user is selected, show user selection
//   if (!currentActiveUser?.userName) {
//     return <h1>Loading</h1>;
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Users List */}
//       <div className="w-1/4 p-4 border-r bg-gray-100">
//         <div className="mb-4">
//           <h3 className="text-lg font-bold">Current User:</h3>
//           <p className="text-xl text-blue-600">{currentUser.username}</p>
//         </div>

//         <h2 className="text-xl font-bold mb-4">Users to Chat</h2>
//         {users
//           .filter((user) => user.username !== currentUser.username)
//           .map((user) => (
//             <div
//               key={user.userID}
//               className={`p-3 cursor-pointer rounded mb-2 ${selectedUser?.userID === user.userID ? "bg-blue-500 text-white" : "hover:bg-blue-200"}`}
//               onClick={() => setSelectedUser(user)}
//             >
//               {user.username}
//             </div>
//           ))}
//       </div>

//       {/* Chat Area */}
//       <div className="w-3/4 p-4 flex flex-col">
//         <h2 className="text-2xl font-semibold mb-4">
//           {selectedUser
//             ? `Chatting with: ${selectedUser.username}`
//             : "Select a user to chat"}
//         </h2>

//         {/* Messages Display */}
//         <div className="flex-grow overflow-y-auto border rounded p-4 mb-4 bg-white">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`mb-2 p-2 rounded ${
//                 msg.fromUsername === currentUser.username
//                   ? "bg-blue-100 self-end text-right ml-auto"
//                   : "bg-gray-100 self-start text-left mr-auto"
//               }`}
//             >
//               <span className="text-sm font-semibold block">
//                 {msg.fromUsername}
//               </span>
//               {msg.message}
//             </div>
//           ))}
//         </div>

//         {/* Message Input */}
//         {selectedUser && (
//           <div className="flex">
//             <input
//               type="text"
//               value={messageInput}
//               onChange={(e) => setMessageInput(e.target.value)}
//               className="flex-grow border rounded p-2"
//               placeholder="Type a message..."
//               onKeyPress={(e) => e.key === "Enter" && sendPrivateMessage()}
//             />
//             <button
//               onClick={sendPrivateMessage}
//               className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
//             >
//               Send
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
