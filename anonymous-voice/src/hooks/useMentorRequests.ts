"use client";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { MentorRequest, ApiResponse } from "@/types/mentor.types";
import api from "@/config/axios.config";

interface UseMentorRequestsReturn {
  mentorRequests: MentorRequest[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  approveMentor: (userName: string) => Promise<void>;
  rejectMentor: (userName: string) => Promise<void>;
  meta: {
    page: number;
    limit: number;
    total: number;
  } | null;
}

export function useMentorRequests(): UseMentorRequestsReturn {
  const [mentorRequests, setMentorRequests] = useState<MentorRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<ApiResponse<MentorRequest>["meta"] | null>(
    null,
  );

  const handleAxiosError = (error: unknown) => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || error.message;
    }
    return "An unexpected error occurred";
  };

  const fetchMentorRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response =
        await api.get<ApiResponse<MentorRequest>>("/api/v1/mentors");
      const pendingMentors = response.data.data.filter(
        (mentor) => !mentor.adminApproval,
      );
      setMentorRequests(pendingMentors);
      setMeta(response.data.meta);
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const approveMentor = async (userName: string) => {
    try {
      await api.patch(`/api/v1/mentors/${userName}`, { adminApproval: true });
      setMentorRequests((prevRequests) =>
        prevRequests.filter((request) => request.userName !== userName),
      );
    } catch (err) {
      setError(handleAxiosError(err));
      await fetchMentorRequests();
    }
  };

  const rejectMentor = async (userName: string) => {
    try {
      await api.post(`/api/v1/mentors/${userName}/reject`);
      setMentorRequests((prevRequests) =>
        prevRequests.filter((request) => request.userName !== userName),
      );
    } catch (err) {
      setError(handleAxiosError(err));
      await fetchMentorRequests();
    }
  };

  useEffect(() => {
    fetchMentorRequests();
  }, [fetchMentorRequests]);

  const refetch = useCallback(async () => {
    await fetchMentorRequests();
  }, [fetchMentorRequests]);

  return {
    mentorRequests,
    isLoading,
    error,
    approveMentor,
    rejectMentor,
    meta,
    refetch,
  };
}
