import { useState } from "react";
export default function useEvent() {
  const [event, setEvent] = useState<any | null>(null);
  const changeEvent = (event: any) => {
    setEvent(event);
  };

  return { event, changeEvent };
}
