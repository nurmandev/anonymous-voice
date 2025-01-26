import { MediaDeviceError } from "@/types/error";

export class MediaService {
  private static async checkMediaPermissions(): Promise<boolean> {
    try {
      const permissions = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });
      return permissions.state === "granted";
    } catch (error) {
      console.error("Error checking media permissions:", error);
      return false;
    }
  }

  static async getMediaStream(
    videoEnabled: boolean = true,
  ): Promise<MediaStream> {
    try {
      // First check if mediaDevices API is available
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new MediaDeviceError(
          "Media devices not supported in this browser",
        );
      }

      // Try to get both audio and video if video is enabled
      if (videoEnabled) {
        try {
          return await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: "user",
            },
            audio: true,
          });
        } catch (error) {
          // If video fails, try audio only
          console.warn(
            "Failed to get video, falling back to audio only:",
            error,
          );
          return await navigator.mediaDevices.getUserMedia({ audio: true });
        }
      }

      // Audio only
      return await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.name === "NotFoundError" ||
          error.name === "DevicesNotFoundError"
        ) {
          throw new MediaDeviceError(
            "No camera or microphone found. Please check your device connections.",
          );
        } else if (
          error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
        ) {
          throw new MediaDeviceError(
            "Please allow camera and microphone access in your browser settings.",
          );
        } else if (
          error.name === "NotReadableError" ||
          error.name === "TrackStartError"
        ) {
          throw new MediaDeviceError(
            "Could not access your camera or microphone. They might be in use by another application.",
          );
        }
      }
      throw new MediaDeviceError(
        "Failed to access media devices. Please check your permissions and try again.",
      );
    }
  }

  static stopMediaStream(stream: MediaStream | null) {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }
}
