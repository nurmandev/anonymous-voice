import { AuthService } from "@/services/auth.service";
import { handleAuthError } from "@/services/error-handler";
import { useRouter } from "next/navigation";

export const useAdminAuth = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await AuthService.googleSignIn("admin");

      // Verify admin domain
      // if (!result.data.user.email?.endsWith('@av.com')) {
      //   throw new Error('Unauthorized admin email domain');
      // }

      // Backend admin whitelist verify
      if (result.data.user.role !== "admin") {
        throw new Error("Unauthorized access. Admin privileges required.");
      }

      router.push("/admin/dashboard");
    } catch (error) {
      handleAuthError(error);
    }
  };

  return { signInWithGoogle };
};
