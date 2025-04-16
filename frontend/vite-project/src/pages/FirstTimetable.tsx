import { useEffect, useState } from "react";
import TimetableAPI from "../api/TimetableAPI";
import UserAPI from "../api/UserAPI";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
export default function FirstTimetable({ firstFlag }: any) {
  const [name, setName] = useState("");
  const { createTimeatable, getTimetables } = TimetableAPI();
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createTimeatable(name);
      if (response) navigate("/wybor-plan");
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const fetchTimetables = async () => {
      const timetables = await getTimetables(userInfo.user_id);
      if (timetables.length > 0 && firstFlag) {
        navigate("/wybor-plan");
      }
    };
    fetchTimetables();
  }, []);

  return (
    <section className="max-w-1732 mx-auto">
      <div className="w-full bg-custom-purple-gradient mt-20">
        <div className="flex flex-col py-4">
          <h1 className="mx-auto ">Wprowadz nazwe swojego planu</h1>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex w-1/2 mx-auto flex-col">
              <input
                className="h-16 text-3xl w-full outline-none border-2 hover:border-black rounded-lg p-2 mt-4"
                type="text"
                placeholder="Twoja nazwa"
                onChange={handleChangeName}
              />
              <p>
                Jeśli nazwa pozostanie pusta żaden plan nie zostanie utworzony
              </p>
              <button className="form-button font-medium w-32 mt-10 mx-auto md:w-56 md:h-20  xl:w-64 xl:h-24">
                Utwórz plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
