"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthService } from "@/services/auth.service";
import { APIError } from "@/types/error";

export default function MentorOnboardingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gender: "",
    name: "",
    bio: "",
    designation: "",
    specialization: "",
    availability: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    // Retrieve temp data from localStorage
    const tempName = localStorage.getItem("tempMentorName");
    const tempEmail = localStorage.getItem("tempMentorEmail");
    const tempProfileImage = localStorage.getItem("tempMentorProfileImage");

    if (tempName || tempEmail || tempProfileImage) {
      setFormData((prev) => ({
        ...prev,
        name: tempName || "",
        email: tempEmail || "",
        profileImage: tempProfileImage || "",
      }));
    }
  }, []);

  const generateSecurePassword = () => {
    return crypto.randomUUID();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const requiredFields = ["name", "email", "gender", "specialization"];
    const isValid = requiredFields.every(
      (field) => formData[field as keyof typeof formData],
    );

    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const mentorData = {
        userName: `mentor_${formData.name.replace(/\s+/g, "_").toLowerCase()}`,
        password: generateSecurePassword(),
        mentor: {
          ...formData,
          adminApproval: false,
        },
      };

      if (!AuthService.validateMentorData(mentorData)) {
        toast.error("Please fill in all required fields correctly");
        return;
      }

      await AuthService.createMentor(mentorData);

      // Clear temp data
      localStorage.removeItem("tempMentorName");
      localStorage.removeItem("tempMentorEmail");
      localStorage.removeItem("tempMentorProfileImage");

      toast.success("Mentor registration submitted successfully");
      // router.push("/mentor-registration/pending-approval");
      router.push("/");
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to submit mentor registration");
      }
      console.error("Mentor registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <CardHeader>
          <CardTitle>Mentor Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <Select value={formData.gender} onValueChange={handleGenderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="Designation"
            />
            <Input
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder="Specialization"
              required
            />
            <Input
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Short Bio"
              className="h-24"
            />
            <Input
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              placeholder="Availability (e.g., Tuesday to Saturday, 10 AM - 6 PM)"
            />
            <Button type="submit" className="w-full">
              Submit Mentor Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
