import { Socket } from "socket.io-client";

export const initializeVoiceCall = (
  socket: Socket,
  currentUser: { username: string },
  selectedUser: { username: string },
  setIsCallActive: React.Dispatch<React.SetStateAction<boolean>>,
  setCallLink: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        to: selectedUser.username,
        candidate: event.candidate,
      });
    }
  };

  peerConnection.ontrack = (event) => {
    const remoteAudio = document.createElement("audio");
    remoteAudio.srcObject = event.streams[0];
    remoteAudio.autoplay = true;
    document.body.appendChild(remoteAudio);
  };

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });
    })
    .catch((error) => console.error("Error accessing microphone:", error));

  peerConnection
    .createOffer()
    .then((offer) => peerConnection.setLocalDescription(offer))
    .then(() => {
      socket.emit("voice-call-offer", {
        to: selectedUser.username,
        offer: peerConnection.localDescription,
      });
    });

  socket.on("voice-call-answer", (answer: RTCSessionDescriptionInit) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    setIsCallActive(true);
    const callLink = `${window.location.origin}/voice-call/${currentUser.username}-${selectedUser.username}`;
    setCallLink(callLink);
  });

  socket.on("ice-candidate", (candidate: RTCIceCandidateInit) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  return peerConnection;
};

export const handleIncomingCall = (
  socket: Socket,
  peerConnection: RTCPeerConnection,
  setIsCallActive: React.Dispatch<React.SetStateAction<boolean>>,
  setCallLink: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  socket.on(
    "voice-call-offer",
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.offer),
      );
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit("voice-call-answer", { to: data.from, answer });
      setIsCallActive(true);
      const callLink = `${window.location.origin}/voice-call/${data.from}-${socket.auth.username}`;
      setCallLink(callLink);
    },
  );
};

export const endVoiceCall = (
  peerConnection: RTCPeerConnection,
  setIsCallActive: React.Dispatch<React.SetStateAction<boolean>>,
  setCallLink: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  peerConnection.close();
  setIsCallActive(false);
  setCallLink(null);
};
