// import { cn } from "@/lib/utils";
// import Image from "next/image";

// export const ChatMessage = ({
//   content,
//   isOutgoing,
//   avatar,
// }: {
//   content: string;
//   isOutgoing: boolean;
//   avatar?: string;
// }) => {
//   return (
//     <div
//       className={cn(
//         "flex items-start space-x-2 mb-4",
//         isOutgoing ? "flex-row-reverse space-x-reverse" : "flex-row",
//       )}
//     >
//       {!isOutgoing && avatar && (
//         <Image
//           src={avatar}
//           alt=""
//           width={50}
//           height={50}
//           className="w-8 h-8 rounded-full flex-shrink-0"
//         />
//       )}
//       <div
//         className={cn(
//           "max-w-[70%] rounded-2xl px-4 py-2",
//           isOutgoing ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-900",
//         )}
//       >
//         <p className="text-sm">{content}</p>
//       </div>
//     </div>
//   );
// };
