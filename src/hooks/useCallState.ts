// "use client";

// import { useState, useCallback } from "react";
// import { CallState } from "@/lib/webrtc/types";

// const initialState: CallState = {
//   isInitialized: false,
//   error: null,
//   roomId: null,
// };

// export function useCallState() {
//   const [callState, setCallState] = useState<CallState>(initialState);

//   const initializeCall = useCallback((roomId: string) => {
//     setCallState({
//       isInitialized: true,
//       error: null,
//       roomId,
//     });
//   }, []);

//   const resetCall = useCallback(() => {
//     setCallState(initialState);
//   }, []);

//   const setError = useCallback((error: string) => {
//     setCallState((prev) => ({
//       ...prev,
//       error,
//     }));
//   }, []);

//   return {
//     callState,
//     initializeCall,
//     resetCall,
//     setError,
//   };
// }
