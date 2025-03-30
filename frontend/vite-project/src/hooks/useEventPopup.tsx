import { useState } from "react";
export default function useEventPopup() {
  const [isEventPopup, setIsEventPopup] = useState(false);

  const changeEventPopup = (flag: any) => {
    if (flag === null || flag === undefined) {
      setIsEventPopup((prev) => !prev);
    } else {
      setIsEventPopup(flag);
    }
  };
  return { isEventPopup, changeEventPopup };
}
