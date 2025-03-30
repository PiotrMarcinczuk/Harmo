import outdatedIcon from "/image/outdated-icon.png";
import useFormatDate from "../hooks/useFormatDate";
import { useCallback } from "react";
export default function TaskBlock({ data }: any) {
  const { formatHours } = useFormatDate();

  const checkIsOutdated = useCallback((date: string) => {
    if (date) {
      const currentDate = new Date();
      const eventDate = new Date(date);
      return currentDate > eventDate;
    }
    return null;
  }, []);
  return (
    <div key={data.event_id} className="relative w-full">
      <p className="text-3xl">
        {data.event_name}
        <span className="absolute right-0 w-10 h-10">
          {checkIsOutdated(data.start_time) ? (
            <img src={outdatedIcon} alt="przestarzale zadanie"></img>
          ) : null}
        </span>
      </p>
      <p className="text-2xl">{data.description}</p>
      <p className="text-2xl mt-2 relative">
        {data.start_time.split("T")[0]}
        <span className="absolute right-0 bottom-0">
          {formatHours(data.start_time)}
        </span>
      </p>
    </div>
  );
}
