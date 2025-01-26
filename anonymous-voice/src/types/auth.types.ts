export interface Mentee {
  gender: string;
  age: number;
}

export interface User {
  userName: string;
  password: string;
  mentee?: Mentee;
}

export interface CurrentUser extends User {
  isVerified: boolean;
  role: string;
  userDetails: string;
  isActive: boolean;
  iat: number;
  exp: number;
}

export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface MentorProfile {
  gender: string;
  name: string;
  bio: string;
  designation: string;
  specialization: string;
  availability: string;
  adminApproval: boolean;
  email: string;
  profileImage: string;
}

export interface CreateMentorData {
  userName: string;
  password: string;
  mentor: MentorProfile;
}

export interface GoogleUser {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface GoogleAuthResponse {
  user: GoogleUser;
}

export type MentorDataField =
  | keyof CreateMentorData
  | `mentor.${keyof MentorProfile}`;
