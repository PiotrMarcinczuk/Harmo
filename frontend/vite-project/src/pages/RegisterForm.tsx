import { useState } from "react";
import UserAPI from "../api/UserAPI";
import RegisterValidation from "../validation/RegisterValidation";
import type { ChangeEvent } from "react";
import {
  RegisterValidationData,
  type RegisterData,
} from "../interfaces/app_interfaces";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    dateOfBirth: "",
    password: "",
    surname: "",
    nickname: "",
    phone: "",
    repeatPassword: "",
  });
  const [validationData, setValidationData] = useState<RegisterValidationData>({
    name: false,
    email: false,
    dateOfBirth: false,
    password: false,
    surname: false,
    nickname: false,
    phone: false,
    repeatPassword: false,
  });
  const {
    name,
    email,
    dateOfBirth,
    password,
    surname,
    nickname,
    phone,
    repeatPassword,
  } = validationData;

  const { registerUser } = UserAPI();
  const { validateData } = RegisterValidation();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClickHaveAccount = () => {
    navigate("/");
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await registerUser(data);
    if (res && (res as any).message === "User created successfully.") {
      navigate("/konto-zarejestrowane");
    }
    if (res && res.response.data.error) {
      const validationResult = validateData(res.response.data.error) || {
        name: false,
        email: false,
        dateOfBirth: false,
        password: false,
        surname: false,
        nickname: false,
        phone: false,
        repeatPassword: false,
      };
      setValidationData(validationResult);
    }
  };

  return (
    <div className="mx-auto">
      <div className="mx-2 sm:mx-10">
        <div className="mx-auto overflow-y-hidden bg-custom-purple-gradient overflow-y-auto max-w-1732 mb-32 mt-10 rounded-xl mb-5 flex md:mt-20 xl:mt-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-wrap justify-center p-1 w-full h-full md:flex-row">
            <p className="text-3xl font-bold w-full text-center mt-10 mb-4 xl:text-5xl">
              Formularz rejestracji
            </p>
            <div className="md:w-1/2">
              <div className="border-box flex flex-col w-full px-4 md:pl-8 md:px-0">
                <div className="flex flex-col md:w-5/6 mb-2">
                  <label className="md:text-3xl xl:text-2xl xl:mb-2">
                    Imię
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChangeInput}
                    className={`h-8 text-gray-800 text-xl opacity-70 px-4 md:h-12 md:text-3xl xl:h-12 xl:text-2xl ${
                      !name
                        ? "outline-none"
                        : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                    }`}
                  />
                  {!name ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Imię jest wymagane
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:w-5/6 mb-2">
                  <label className="md:text-3xl xl:text-2xl xl:mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChangeInput}
                    className={`h-8 text-gray-800 text-xl opacity-70 px-4 md:h-12 md:text-3xl xl:h-12 xl:text-2xl ${
                      !email
                        ? "outline-none"
                        : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                    }`}
                  />
                  {!email ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Email jest nieprawidłowy lub zajęty
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:w-5/6 mb-2">
                  <label className="md:text-3xl xl:text-2xl xl:mb-2">
                    Data urodzenia
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    onChange={handleChangeInput}
                    className={`h-8 text-gray-800 text-xl opacity-70 px-4 md:h-12 md:text-3xl xl:h-12 xl:text-2xl ${
                      !dateOfBirth
                        ? "outline-none"
                        : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                    }`}
                  />
                  {!dateOfBirth ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Data urodzenia jest wymagana
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:w-5/6 mb-2">
                  <label className="md:text-3xl xl:text-2xl xl:mb-2">
                    Hasło
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChangeInput}
                    className={`h-8 text-gray-800 text-xl opacity-70 px-4 md:h-12 md:text-3xl xl:h-12 xl:text-2xl ${
                      !password
                        ? "outline-none"
                        : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                    }`}
                  />
                  {!password ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Hasło musi składać się z 6-20 znaków, zawierać co najmniej
                      jedną małą literę, jedną dużą literę, jedną cyfrę i jeden
                      znak specjalny
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="border-box flex flex-col md:items-end w-full px-4 md:pr-8">
                <div className="flex flex-col md:w-5/6 mb-2">
                  <label className="md:text-3xl xl:text-2xl xl:mb-2">
                    Nazwisko
                  </label>
                  <input
                    type="text"
                    name="surname"
                    onChange={handleChangeInput}
                    className={`h-8 text-gray-800 text-xl opacity-70 px-4 md:h-12 md:text-3xl xl:h-12 xl:text-2xl ${
                      !surname
                        ? "outline-none"
                        : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                    }`}
                  />
                  {!surname ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Nazwisko jest wymagane
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:w-5/6 mb-2">
                  <label className="md:text-3xl xl:text-2xl xl:mb-2">
                    Nazwa użytkownika
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    onChange={handleChangeInput}
                    className={`h-8 text-gray-800 text-xl opacity-70 px-4 md:h-12 md:text-3xl xl:h-12 xl:text-2xl ${
                      !nickname
                        ? "outline-none"
                        : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                    }`}
                  />
                  {!nickname ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Nazwa użytkownika jest niepoprawna i może zawierać
                      maksymalnie 15 liter
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:w-5/6 mb-2">
                  <label className="md:text-3xl xl:text-2xl xl:mb-2">
                    Nr.telefonu
                  </label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChangeInput}
                    className={`h-8 text-gray-800 text-xl opacity-70 px-4 md:h-12 md:text-3xl xl:h-12 xl:text-2xl ${
                      !phone
                        ? "outline-none"
                        : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                    }`}
                  />
                  {!phone ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Niepoprawny format, numer telefonu może zawierać
                      maksymalnie 9 cyfr
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:w-5/6 mb-2">
                  <label className="md:text-3xl xl:text-2xl xl:mb-2">
                    Powtórz hasło
                  </label>
                  <input
                    type="password"
                    name="repeatPassword"
                    onChange={handleChangeInput}
                    className={`h-8 text-gray-800 text-xl opacity-70 px-4 md:h-12 md:text-3xl xl:h-12 xl:text-2xl ${
                      !repeatPassword
                        ? "outline-none"
                        : "border-2 border-custom-validation-red focus:outline-none outline-custom-validation-red"
                    }`}
                  />
                  {!repeatPassword ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Hasła nie zgadzają się
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-around text-center text-1xl items-center mt-6 lg:mt-6 xl:text-nowrap w-full text-left">
              <div className="w-1/2 h-full">
                <button className="bg-form-button-color text-xl p-2 text-white font-medium h-12 mb-5 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300 md:text-4xl md:w-56 md:h-36 mt-5 xl:w-72 xl:h-24 xl:text-5xl">
                  Rejestracja
                </button>
              </div>
              <div className="w-1/2 h-full flex justify-center">
                <div className="flex justify-center items-center ">
                  <button
                    onClick={handleClickHaveAccount}
                    className="bg-form-button-color text-xl p-2 text-white font-medium w-32 md:h-12 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 md:text-3xl md:w-56 md:h-36 xl:w-72 xl:h-24 xl:text-3xl">
                    Posiadam już konto
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
