import { useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";
import { useSelector } from "react-redux";
import TimetableAPI from "../api/TimetableAPI";
import { useNavigate, Link } from "react-router-dom";

export default function SelectTimetable() {
  const [timetable, setTimetable] = useState<any[]>([]);
  const { frontUrl } = useHttp();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { load } = useSelector((state: any) => state.load);
  const { getTimetables, getTimetableForCollaborator } = TimetableAPI();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetable = async () => {
      if (userInfo && userInfo.user_id) {
        const timetableData = await getTimetables(userInfo.user_id);
        setTimetable(timetableData);
      }
    };
    const fetchCollaboratorTimetables = async () => {
      if (userInfo && userInfo.user_id) {
        const timetables = await getTimetableForCollaborator(userInfo.user_id);
        setTimetable(timetables);
      }
    };
    if (userInfo.is_admin) {
      fetchTimetable();
    } else {
      fetchCollaboratorTimetables();
    }
  }, [load]);

  const handleClickButton = (timetableId: number) => {
    navigate(`/plan/${timetableId}`);
  };

  return (
    <section className="max-w-1732 mx-auto mt-10">
      {userInfo.is_admin && (
        <div
          className="bg-red-200 max-w-[500px] p-4 mx-auto flex justify-center text-nowrap
        ">
          <Link to={`${frontUrl}/stworz-plan`} className="form-button p-2 ">
            Stwórz nowy plan
          </Link>
        </div>
      )}
      <div className="flex flex-col justify-around mt-32 lg:flex-row -mx-4">
        {/* {timetable && timetable.error && <Error />} */}
        {timetable &&
          timetable.map((el) => (
            <div
              key={el.timetable_id}
              className="flex flex-col my-4 mx-auto bg-custom-purple-gradient h-[350px] w-3/4 sm:w-1/2 relative lg:w-1/4 lg:h-[500px] lg:mx-4 lg:my-0">
              <h2 className="mx-auto text-5xl mt-4">{el.timetable_name}</h2>
              <button
                className="form-button absolute bottom-4 left-[50%] -translate-x-[50%] p-4"
                onClick={() => handleClickButton(el.timetable_id)}>
                Wybierz
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}
