export interface CallInvitation {
  // caller: string;
  // callee: string;
  roomId: string;
  from: string;
  to: string;
  type: "video" | "audio";
}

export interface CallParticipant {
  username: string;
  role: "mentor" | "mentee";
}
