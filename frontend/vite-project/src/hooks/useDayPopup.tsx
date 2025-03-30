import { useState } from "react";
export default function useDayPopup() {
  const [isDayPopup, setIsDayPopup] = useState(false);

  const changeDayPopup = (flag: any) => {
    if (flag === null || flag === undefined) {
      setIsDayPopup((prev) => !prev);
    } else {
      setIsDayPopup(flag);
    }
  };
  return { isDayPopup, changeDayPopup };
}
