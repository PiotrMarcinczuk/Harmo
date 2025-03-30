import type { EventValidationData } from "../interfaces/app_interfaces";

export default function EventValidation() {
  const validateData = (errors: any) => {
    if (!errors) return;
    const newData: EventValidationData = {
      eventName: false,
      startTime: false,
      endTime: false,
    };
    if (errors) {
      errors.forEach((error: any) => {
        if (error.path in newData) {
          newData[error.path as keyof EventValidationData] = true;
        }
      });
      return newData;
    }
  };

  return { validateData };
}
