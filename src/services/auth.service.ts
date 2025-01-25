import { jwtDecode } from "jwt-decode";
import { APIError } from "@/types/error";
import { apiConfig } from "@/config/api.config";
import { UserRole } from "@/types/user.types";
import { CreateMentorData, MentorDataField } from "@/types/auth.types";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "@/lib/firebase";
import api from "@/config/axios.config";
import axios from "axios";

export interface UserInfo {
  id?: string;
  userName: string;
  isVerified?: boolean;
  role: UserRole;
  userDetails?: string;
}

interface CreateMenteeData {
  userName: string;
  password: string;
  mentee: {
    gender: string;
    age: number;
  };
}

interface LoginData {
  userName: string;
  password: string;
}

interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    needsPasswordChange: boolean;
    user: {
      email: string;
      role: string;
    };
  };
}

export class AuthService {
  private static readonly USER_KEY = "user";

  // Role-based Google authentication
  static async googleSignIn(role: "admin" | "mentor") {
    try {
      const result = await signInWithPopup(getAuth(), googleProvider);
      const idToken = await result.user.getIdToken();

      // Set auth data directly from Firebase
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", idToken);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: result.user.email,
            role: role,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          }),
        );
      }

      return {
        data: {
          accessToken: idToken,
          needsPasswordChange: false,
          user: {
            email: result.user.email,
            role: role,
          },
        },
      };
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw new APIError("Google Sign-In Error", 500, "AUTH_ERROR");
    }
  }

  static async checkExistingGoogleUser(
    email: string,
    role: "admin" | "mentor",
  ) {
    try {
      const { data } = await api.post("/api/v1/auth/verify-google-user", {
        email,
        role,
      });

      return {
        exists: data.exists,
        isApproved: data.isApproved,
        userData: data.userData,
      };
    } catch (error) {
      console.error("Check Existing Google User Error:", error);
      throw new APIError("Check Existing Google User Error", 500, "AUTH_ERROR");
    }
  }

  private static setAuthData(token: string) {
    const decodedToken = jwtDecode<UserInfo>(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(decodedToken));
    }
  }

  // ================================= //
  static async createMentee(data: CreateMenteeData) {
    const response = await fetch(
      `${apiConfig.apiUrl}/api/v1/users/create-mentee`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new APIError(
        "Failed to create mentee",
        response.status,
        "REGISTRATION_ERROR",
      );
    }
    return response.json();
  }

  static async login(credentials: LoginData) {
    try {
      const response = await api.post<LoginResponse>("/api/v1/auth/login", {
        userName: credentials.userName,
        password: credentials.password,
      });

      if (response.data.success) {
        const decodedToken = jwtDecode<UserInfo>(
          response.data.data.accessToken,
        );

        // Store auth data in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", response.data.data.accessToken);
          localStorage.setItem(
            "needsPasswordChange",
            String(response.data.data.needsPasswordChange),
          );
          localStorage.setItem("user", JSON.stringify(decodedToken));
          localStorage.setItem("isAuthenticated", "true");
        }

        return response.data;
      }

      throw new APIError(
        response.data.message || "Authentication failed",
        response.status || 401,
        "AUTH_ERROR",
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new APIError(
          error.response?.data?.message || "Login failed",
          error.response?.status || 500,
          "AUTH_ERROR",
        );
      }
      throw error;
    }
  }

  static getStoredUser(): UserInfo | null {
    if (typeof window === "undefined") return null;

    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error getting stored user:", error);
      return null;
    }
  }

  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("needsPasswordChange");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    }
  }

  // static isAuthenticated(): boolean {
  //   if (typeof window !== "undefined") {
  //     return localStorage.getItem("isAuthenticated") === "true";
  //   }
  //   return false;
  // }
  static isAuthenticated(): boolean {
    return !!this.getStoredUser();
  }

  static getStoredToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  }

  static async handleGoogleMentorSignUp() {
    try {
      googleProvider.addScope("profile");
      googleProvider.addScope("email");

      const result = await signInWithPopup(getAuth(), googleProvider);
      const user = result.user;

      if (!user) {
        throw new Error("No user returned from Google Sign-In");
      }

      const idToken = await user.getIdToken();

      // Check if user has previously signed in (using Firebase auth state)
      const existingUser =
        user.metadata.lastSignInTime !== user.metadata.creationTime;

      return {
        existingUser,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          idToken,
        },
      };
    } catch (error) {
      console.error("Google Sign-Up Error:", error);
      throw error;
    }
  }

  static async createMentor(data: CreateMentorData) {
    try {
      const response = await fetch(
        `${apiConfig.apiUrl}/api/v1/users/create-mentor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getStoredToken()}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new APIError(
          errorData.message || "Failed to create mentor",
          response.status,
          "MENTOR_REGISTRATION_ERROR",
        );
      }
      return response.json();
    } catch (error) {
      console.error("Create Mentor Error Details:", error);
      throw error;
    }
  }

  // Updated getNestedValue
  private static getNestedValue(
    obj: CreateMentorData,
    path: MentorDataField,
  ): string | number | boolean {
    const parts = path.split(".");
    let result: unknown = obj;

    for (const part of parts) {
      if (result && typeof result === "object" && part in result) {
        result = (result as Record<string, unknown>)[part];
      } else {
        return "";
      }
    }

    return typeof result === "string" ||
      typeof result === "number" ||
      typeof result === "boolean"
      ? result
      : "";
  }

  // Validate mentor data method
  static validateMentorData(data: Partial<CreateMentorData>): boolean {
    const requiredFields: MentorDataField[] = [
      "userName",
      "mentor.name",
      "mentor.email",
      "mentor.gender",
      "mentor.specialization",
    ];

    return requiredFields.every((field) => {
      const value = this.getNestedValue(data as CreateMentorData, field);
      return value !== undefined && value !== "";
    });
  }
}

export const authService = new AuthService();
