export const SOCKET_EVENTS = {
  // Call signaling
  CALL_INITIATE: "call:initiate",
  CALL_INCOMING: "call:incoming",
  CALL_ACCEPT: "call:accept",
  CALL_REJECT: "call:reject",
  CALL_END: "call:end",

  // WebRTC signaling
  WEBRTC_OFFER: "webrtc:offer",
  WEBRTC_ANSWER: "webrtc:answer",
  WEBRTC_ICE: "webrtc:ice",
} as const;

export const ICE_SERVERS = [{ urls: "stun:stun.l.google.com:19302" }];
