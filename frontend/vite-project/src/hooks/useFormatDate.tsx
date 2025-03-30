export default function useFormatDate() {
  const formatHours = (date: string) => {
    if (date) {
      const [, timePart] = date.split("T");
      const [hours, minutes] = timePart.split(":");
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
      return `${formattedTime}`;
    }
  };

  const formatDate = (date: string) => {
    if (date) {
      const [datePart] = date.split("T");
      const [, month, day] = datePart.split("-");
      const formattedDate = `${day}.${month}`;
      return formattedDate;
    }
  };

  const convertDateToString = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    const dayName = date.toLocaleDateString("pl-PL", options);
    const formattedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    return formattedDayName;
  };

  return {
    formatHours,
    formatDate,
    convertDateToString,
  };
}
