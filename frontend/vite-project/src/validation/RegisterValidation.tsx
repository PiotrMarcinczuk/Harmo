import type { RegisterValidationData } from "../interfaces/app_interfaces";

export default function RegisterValidation() {
  const validateData = (errors: any) => {
    if (!errors || errors.status === 200) return;
    const newData: RegisterValidationData = {
      name: false,
      email: false,
      dateOfBirth: false,
      password: false,
      surname: false,
      nickname: false,
      phone: false,
      repeatPassword: false,
    };

    if (errors) {
      errors.forEach((error: any) => {
        if (error.path in newData) {
          newData[error.path as keyof RegisterValidationData] = true;
        }
      });
      return newData;
    }
  };

  return { validateData };
}
