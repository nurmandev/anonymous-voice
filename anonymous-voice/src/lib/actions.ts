"use server";

import { contactFormSchema } from "./validations/contact";

type FormState = {
  success: boolean;
  error?: string;
} | null;

export async function submitContactForm(
  prevState: FormState,
  formData: FormData,
) {
  try {
    const validatedFields = contactFormSchema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    // Simulate sending the validated data to an API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // You can now use validatedFields in your API call
    // Example: await api.post('/contact', validatedFields);

    return {
      success: true,
      data: validatedFields,
    } as const;
  } catch (error) {
    console.log("Error submitting form:", error);
    return {
      success: false,
      error: "Failed to submit form. Please try again.",
    } as const;
  }
}
