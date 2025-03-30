import { useState } from "react";
import { type Event } from "../interfaces/app_interfaces";
import TaskBlock from "./TaskBlock";

interface EventsListProps {
  events: Event[];
}

export default function EventsList({
  events,
  onSelectEvent,
}: EventsListProps & { onSelectEvent: (id: Event | null) => void }) {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const changeColor = (event: any) => {
    const id = event.event_id;
    if (selectedEventId === id) {
      setSelectedEventId(null);
      onSelectEvent(null);
    } else {
      setSelectedEventId(id);
      onSelectEvent(event);
    }
  };

  return (
    <div className="mt-2 mx-auto w-full h-full md:w-2/3 xl:w-1/2">
      <div className="-m-2 mt-4 mb-0">
        {events.map((event: any) => {
          // const eventStartTime = new Date(event.start_time);
          const currentDate = new Date();
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(currentDate.getDate() - 30);
          return (
            <div
              onClick={() => changeColor(event)}
              className={`p-2 m-2 my-2 hover:cursor-pointer ${
                selectedEventId === event.event_id
                  ? "bg-selected-collaborator"
                  : "bg-white"
              }`}
              key={event.event_id}>
              <TaskBlock data={event} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
