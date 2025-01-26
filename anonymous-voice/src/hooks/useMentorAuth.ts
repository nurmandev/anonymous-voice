import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner";
import { handleAuthError } from "@/services/error-handler";

interface GoogleAuthResponse {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    idToken: string;
  };
  existingUser?: boolean;
}

export const useMentorAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await AuthService.googleSignIn("mentor");
      console.log("Mentor Sign-In Result:", result);

      // Check if mentor is approved
      // if (!result.data.isApproved) {
      //   toast.error("Your mentor account is pending approval.");
      //   return;
      // }

      router.push("/dashboard");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError(null);

      const googleAuthResponse =
        (await AuthService.handleGoogleMentorSignUp()) as GoogleAuthResponse;

      // Store temporary data in localStorage
      localStorage.setItem("tempMentorUid", googleAuthResponse.user.uid);
      localStorage.setItem(
        "tempMentorName",
        googleAuthResponse.user.displayName || "",
      );
      localStorage.setItem(
        "tempMentorEmail",
        googleAuthResponse.user.email || "",
      );
      localStorage.setItem(
        "tempMentorProfileImage",
        googleAuthResponse.user.photoURL || "",
      );

      // Handle existing user logic
      if (googleAuthResponse.existingUser) {
        // If user exists, sign them in and redirect to dashboard
        await signInWithGoogle();
        router.push("/dashboard");
      } else {
        // If new user, redirect to onboarding
        router.push("/mentor-registration/onboarding");
      }
    } catch (err: unknown) {
      let errorMessage = "Failed to sign up with Google. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
        console.error("Google Sign-Up Error:", {
          message: err.message,
          fullError: err,
        });
      } else {
        console.error("Google Sign-Up Error:", err);
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { signInWithGoogle, handleGoogleSignUp, loading, error };
};
