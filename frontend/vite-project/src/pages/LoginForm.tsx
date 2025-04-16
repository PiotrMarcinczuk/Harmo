import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type {
  LoginData,
  LoginValidationData,
} from "../interfaces/app_interfaces";
import UserAPI from "../api/UserAPI";
import TimetableAPI from "../api/TimetableAPI";
import LoginValidation from "../validation/LoginValidation";
import { useSelector } from "react-redux";

export default function LoginForm() {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [validationData, setValidationData] = useState<LoginValidationData>({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const { validateData } = LoginValidation();
  const { email, password } = validationData;
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { loginUser, setUser } = UserAPI();
  const { getTimetables, getTimetableForCollaborator } = TimetableAPI();
  const { userInfo } = useSelector((state: any) => state.auth);
  useEffect(() => {
    const fetchTimetables = async () => {
      if (userInfo) {
        try {
          const response = await getTimetables(userInfo.user_id);
          if (response.data || response[0].timetable_id) {
            navigate("/wybor-plan");
          } else if (userInfo.is_admin) {
            navigate("/pierwszy-plan");
          } else {
            navigate("/");
          }
        } catch (error) {
          return error;
        }
      }
    };
    fetchTimetables();
  }, []);

  const handleClickRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await loginUser(data);
    if (res.response && res.response.data.error) {
      const validationResult = validateData(res.response.data.error) || {
        email: false,
        password: false,
        repeatPassword: false,
      };
      setValidationData(validationResult);
    } else {
      await setUser(res.user);
      if (res.user && res.user.is_admin) {
        navigate("/pierwszy-plan");
      } else {
        await getTimetableForCollaborator(res.user.user_id);
        navigate("/wybor-plan");
      }
    }
  };

  return (
    <section className="relative max-w-1732 mt-20 mb-20  sm:mt-32 xl:mt-20 xl:w-full mx-auto">
      <div className="flex flex-col sm:flex-row mx-4 2xl:mx-2">
        <h1 className="absolute left-1/2 w-3/4 -translate-x-1/2 text-2xl lg:text-4xl md:w-full text-center mt-5 font-medium xl:text-5xl xl:text-nowrap">
          Aby korzystać z witryny musisz posiadać konto
        </h1>
        <div className="bg-custom-purple-gradient w-full sm:w-1/2 box-border flex flex-col justify-center sm:rounded-l-md pt-10 xl:pt-0">
          <form
            className="flex flex-col items-center mt-20 sm:mt-10 xl:mt-28 md:p-10"
            onSubmit={handleSubmit}>
            <div className="flex flex-col w-5/6 mb-7 md:w-11/12">
              <label htmlFor="name" className="text-1xl md:text-3xl xl:mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChangeInput}
                className={`xl:h-14 text-gray-800 text-2xl opacity-70 px-4 md:h-14 xl:text-3xl ${
                  !email
                    ? "outline-none"
                    : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                }`}
              />
              {email && (
                <p className="text-custom-validation-red font-bold text-xs md:text-base">
                  Email jest nieprawidłowy
                </p>
              )}
            </div>
            <div className="flex flex-col w-5/6 mb-7 md:w-11/12 ">
              <label
                htmlFor="password"
                className="text-1xl md:text-3xl xl:mb-2">
                Hasło
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChangeInput}
                className={`xl:h-14 text-gray-800 text-xl opacity-70 px-4 md:h-14 xl:text-3xl ${
                  !password
                    ? "outline-none"
                    : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                }`}
              />
              {password && (
                <p className="text-custom-validation-red font-bold text-xs md:text-base">
                  Nieprawidłowe hasło
                </p>
              )}
            </div>

            <button className="bg-form-button-color text-2xl text-white font-medium text-4xl w-48 h-16 md:w-32 mt-10 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 mb-6 md:text-4xl md:w-56 md:h-20 xl:w-64 xl:h-24 xl:text-5xl sm:mb-0">
              Zaloguj
            </button>
          </form>
        </div>
        <div className="bg-custom-blue-gradient w-full sm:w-1/2 box-border flex flex-col items-center sm:rounded-r-md">
          <button
            className="bg-form-button-color text-2xl text-white font-medium w-36 mt-8 sm:mt-28 h-16 md:text-4xl md:w-56 md:h-20 md:mt-40 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 xl:w-72 xl:h-24 xl:text-5xl xl:mb-2"
            onClick={handleClickRegister}>
            Rejestracja
          </button>
          <section className="m-2 mt-10 sm:mt-20 md:text-xl xl:m-3 xl:text-2xl xl:mt-24">
            Zaplanuj czas pracy swoich pracowników z łatwością. Zarejestruj się
            a potem zaloguj, aby stworzyć i zarządzać swoim harmonogramem i
            zadaniami. Aplikacja oferuje wiele funkcji dzięki, którym będziesz
            mógł zarządzać czasem swoim i swoich pracowników.
            <br />
            <Link
              className="text-custom-blue-text font-bold text-left text-base"
              to="/pomoc">
              Więcej informacji
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}
