import type { LoginValidationData } from "../interfaces/app_interfaces";

export default function useLoginValidation() {
  const validateData = (errors: any) => {
    const errorArray = errors;
    const newData: any = {
      email: false,
      password: false,
      repeatPassword: false,
    };
    if (errorArray) {
      for (const [key, value] of Object.entries(errorArray)) {
        if (key in newData && value === true) {
          newData[key as keyof LoginValidationData] = true;
        }
      }
    }

    return newData;
  };

  return {
    validateData,
  };
}
