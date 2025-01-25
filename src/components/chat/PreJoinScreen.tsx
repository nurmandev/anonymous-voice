import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

interface PreJoinScreenProps {
  onJoin: () => void;
  localStream: MediaStream | null;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
}

const PreJoinScreen: React.FC<PreJoinScreenProps> = ({
  onJoin,
  localStream,
  isAudioEnabled,
  isVideoEnabled,
  toggleAudio,
  toggleVideo,
}) => {
  const hasMediaAccess = localStream !== null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl mx-4 bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            {hasMediaAccess ? "Ready to Join?" : "Camera Access Required"}
          </h2>

          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {localStream && (
              <video
                autoPlay
                muted
                playsInline
                ref={(video) => {
                  if (video) video.srcObject = localStream;
                }}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant={isAudioEnabled ? "outline" : "destructive"}
              size="lg"
              onClick={toggleAudio}
              className="rounded-full p-4"
              disabled={!hasMediaAccess}
            >
              {isAudioEnabled ? (
                <Mic className="h-6 w-6" />
              ) : (
                <MicOff className="h-6 w-6" />
              )}
            </Button>

            <Button
              variant={isVideoEnabled ? "outline" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              className="rounded-full p-4"
              disabled={!hasMediaAccess}
            >
              {isVideoEnabled ? (
                <Video className="h-6 w-6" />
              ) : (
                <VideoOff className="h-6 w-6" />
              )}
            </Button>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={onJoin}
              size="lg"
              className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!hasMediaAccess}
            >
              {hasMediaAccess ? "Join Call" : "Enable Camera Access"}
            </Button>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 text-center text-sm text-gray-600">
          {hasMediaAccess
            ? "Ready to join the call"
            : "Please allow camera and microphone access when prompted"}
        </div>
      </Card>
    </div>
  );
};

export default PreJoinScreen;
