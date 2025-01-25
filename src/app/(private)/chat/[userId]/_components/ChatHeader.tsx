// import React from "react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// import { Phone, Info } from "lucide-react";
// import UserDetailSheet from "./UserDetailSheet";
// import { ChatUser } from "@/types/chat.types";

// const renderUserStatus = (user: ChatUser) => {
//   const statusMap = {
//     online: {
//       color: "bg-green-500 text-green-500",
//       text: "Online",
//     },
//     offline: {
//       color: "text-muted-foreground",
//       text: `Last active ${user.lastActive}`,
//     },
//     away: {
//       color: "bg-yellow-500 text-yellow-500",
//       text: "Away",
//     },
//   };

//   const { color, text } = statusMap[user.status as keyof typeof statusMap];

//   return user.status !== "offline" ? (
//     <div className="flex items-center gap-1">
//       <span
//         className={`h-2 w-2 rounded-full ${color.includes("bg-") ? color : ""}`}
//       />
//       <span className={`text-xs`}>{text}</span>
//     </div>
//   ) : (
//     <p className={`text-xs ${color}`}>{text}</p>
//   );
// };

// const ChatActionButtons = React.memo(
//   ({
//     isProfileOpen,
//     setIsProfileOpen,
//     user,
//   }: {
//     isProfileOpen: boolean;
//     setIsProfileOpen: (isOpen: boolean) => void;
//     user: ChatUser;
//   }) => (
//     <>
//       <Button variant="ghost" size="icon">
//         <Phone className="h-5 w-5" />
//         <span className="sr-only">Voice Call</span>
//       </Button>

//       <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
//         <SheetTrigger asChild className="lg:hidden">
//           <Button variant="ghost" size="icon">
//             <Info className="h-5 w-5" />
//             <span className="sr-only">User Info</span>
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="right" className="p-0 w-80">
//           <UserDetailSheet user={user} />
//         </SheetContent>
//       </Sheet>
//     </>
//   ),
// );

// ChatActionButtons.displayName = "ChatActionButtons";

// const ChatHeader = React.memo(
//   ({
//     user,
//     isProfileOpen,
//     setIsProfileOpen,
//   }: {
//     user: ChatUser;
//     isProfileOpen: boolean;
//     setIsProfileOpen: (isOpen: boolean) => void;
//   }) => (
//     <header className="flex items-center gap-3 p-4 border-b">
//       <Avatar className="h-10 w-10">
//         <AvatarImage src={user.avatar} alt={user.name} />
//         <AvatarFallback>{user.name[0]}</AvatarFallback>
//       </Avatar>

//       <div className="flex-1 min-w-0">
//         <h2 className="font-semibold truncate">{user.name}</h2>
//         <div className="flex items-center gap-2">{renderUserStatus(user)}</div>
//       </div>

//       <ChatActionButtons
//         isProfileOpen={isProfileOpen}
//         setIsProfileOpen={setIsProfileOpen}
//         user={user}
//       />
//     </header>
//   ),
// );

// ChatHeader.displayName = "ChatHeader";

// export default ChatHeader;
