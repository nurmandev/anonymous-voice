import { AxiosError } from "axios";
import api from "@/config/axios.config";
import { AppointmentPayload } from "@/types/plan";

interface AppointmentFilters {
  status?: string;
  mentorUserName?: string;
  menteeUserName?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

interface AppointmentUpdateData {
  status?: string;
  content?: string;
  selectedSlot?: {
    time: string;
    isAvailable: boolean;
  };
}

export class AppointmentService {
  static async createAppointment(appointmentData: AppointmentPayload) {
    try {
      const response = await api.post(
        "/api/v1/appointments/create-appointment",
        appointmentData,
      );
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios Error Details:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      }
      throw error;
    }
  }

  static async getAppointments(filters?: AppointmentFilters) {
    return api.get("/api/v1/appointments", { params: filters });
  }

  static async getSingleAppointment(id: string) {
    return api.get(`/api/v1/appointments/${id}`);
  }

  static async updateAppointment(id: string, data: AppointmentUpdateData) {
    return api.patch(`/api/v1/appointments/${id}`, data);
  }

  static async deleteAppointment(id: string) {
    return api.delete(`/api/v1/appointments/${id}`);
  }
}
