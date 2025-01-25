import { MediaConfig } from "./types";

export class MediaManager {
  private stream: MediaStream | null = null;

  async getStream(config: MediaConfig): Promise<MediaStream> {
    try {
      // First check if devices are available
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideo = devices.some((device) => device.kind === "videoinput");
      const hasAudio = devices.some((device) => device.kind === "audioinput");

      // Adjust constraints based on available devices
      const constraints = {
        audio: config.audio && hasAudio ? true : false,
        video:
          config.video && hasVideo
            ? {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: "user",
              }
            : false,
      };

      // Try to get the stream with adjusted constraints
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      return this.stream;
    } catch (error) {
      console.error("Media access error:", error);
      // Try fallback options
      return this.getFallbackStream(config);
    }
  }

  private async getFallbackStream(config: MediaConfig): Promise<MediaStream> {
    try {
      // Try audio-only if video fails
      if (config.video && config.audio) {
        console.log("Trying audio-only fallback...");
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        return this.stream;
      }

      throw new Error("Could not access any media devices");
    } catch (error) {
      if (error instanceof Error) {
        throw this.handleMediaError(error);
      }
      throw new Error("Failed to access media devices");
    }
  }

  private handleMediaError(error: Error): Error {
    switch (error.name) {
      case "NotFoundError":
        return new Error(
          "No camera or microphone found. Please check your device connections.",
        );
      case "NotAllowedError":
        return new Error(
          "Please allow access to camera and microphone to join the call.",
        );
      case "NotReadableError":
        return new Error(
          "Your camera or microphone is already in use by another application.",
        );
      case "OverconstrainedError":
        return new Error(
          "Your device doesn't support the requested media quality.",
        );
      default:
        return new Error(`Media access error: ${error.message}`);
    }
  }

  toggleAudio(enabled: boolean) {
    this.stream?.getAudioTracks().forEach((track) => {
      track.enabled = enabled;
    });
  }

  toggleVideo(enabled: boolean) {
    this.stream?.getVideoTracks().forEach((track) => {
      track.enabled = enabled;
    });
  }

  cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }
}
