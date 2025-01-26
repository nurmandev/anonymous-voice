"use client";

import { Volunteer } from "@/types/volunteer";
import { useEffect, useState } from "react";
import api from "@/config/axios.config";

const useVolunteers = <T extends Volunteer[]>() => {
  const [volunteers, setVolunteers] = useState<T>([] as unknown as T);
  const [approvedVolunteers, setApprovedVolunteers] = useState<T>(
    [] as unknown as T,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await api.get("/api/v1/mentors");
        const allMentors = response.data.data;
        const approved = allMentors.filter(
          (volunteer: Volunteer) => volunteer.adminApproval === true,
        );

        setVolunteers(allMentors as T);
        setApprovedVolunteers(approved as T);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  return { volunteers, approvedVolunteers, loading, error };
};

export default useVolunteers;
