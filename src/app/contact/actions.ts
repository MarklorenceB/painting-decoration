"use server";

interface FormState {
  success: boolean;
  error: string;
}

export async function submitContactForm(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const data = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    town: formData.get("town") as string,
    service: formData.get("service") as string,
    message: formData.get("message") as string,
  };

  if (!data.name || !data.message) {
    return { success: false, error: "Please fill in your name and project details." };
  }

  try {
    const res = await fetch("https://hook.eu2.make.com/kf3sylpqgxqftw4i3h251tm12nr5ue2x", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { success: false, error: "Something went wrong. Please try calling instead." };
    }

    return { success: true, error: "" };
  } catch {
    return { success: false, error: "Something went wrong. Please try calling instead." };
  }
}
