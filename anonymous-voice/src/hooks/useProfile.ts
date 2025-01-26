// import { useEffect, useState } from "react";
// import { UserProfile } from "@/lib/db/users";
// import { useAuth } from "./useAuth";
// import { UserService } from "@/lib/services/user.service";

// export function useProfile() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     async function loadProfile() {
//       if (!user) {
//         setProfile(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         const userProfile = await UserService.getProfile(user.uid);
//         setProfile(userProfile);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadProfile();
//   }, [user]);

//   const updateProfile = async (updates: Partial<UserProfile>) => {
//     if (!user) {
//       throw new Error("User must be logged in to update profile");
//     }

//     try {
//       const updated = await UserService.updateProfile(user.uid, updates);
//       setProfile(updated);
//       return updated;
//     } catch (err) {
//       setError(err as Error);
//       throw err;
//     }
//   };

//   return { profile, loading, error, updateProfile };
// }
