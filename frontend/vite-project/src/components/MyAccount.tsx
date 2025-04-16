import React, { useState, useEffect, useRef, useCallback } from "react";
import UserAPI from "../api/UserAPI";
import AdminNavigation from "./AdminNavigation";
import RegisterValidation from "../validation/RegisterValidation";
import { useParams, useNavigate } from "react-router-dom";
import { type RegisterValidationData } from "../interfaces/app_interfaces";
import MenuButton from "./MenuButton";
import useMobileMenu from "../hooks/useMobileMenu";
import UserNavigation from "./UserNavigation";
import { useSelector } from "react-redux";
export default function MyAccount() {
  const [data, setData] = useState<any>([]);
  const [initialData, setInitialData] = useState<any>([]);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const { updateYourself, setUser } = UserAPI();
  const { validateData } = RegisterValidation();
  const { timetableId } = useParams();
  const navigate = useNavigate();
  const { isMenuOpen, setIsMenuOpen } = useMobileMenu();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { load } = useSelector((state: any) => state.load);
  useEffect(() => {
    const fetchData = async () => {
      setData(userInfo);
      setInitialData(userInfo);
    };
    fetchData();
  }, [load]);

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (initialData === data) {
        alert("Nie wprowadzono żadnych zmian");
        return;
      }
      const re = await updateYourself({
        ...data,
        dateOfBirth: data.date_of_birth,
        password: data.password !== "" ? data.password : undefined,
        repeatPassword:
          data.repeatPassword !== "" ? data.repeatPassword : undefined,
        timetableId: parseInt(timetableId || "0"),
        assignedUserId: userInfo.user_id,
        userId: userInfo.user_id,
      });

      if (re && typeof re === "object" && "data" in re) {
        setUser((re as { data: any }).data);
        setValidationData({
          name: false,
          email: false,
          dateOfBirth: false,
          password: false,
          surname: false,
          nickname: false,
          phone: false,
          repeatPassword: false,
        });
        passwordRef.current!.value = "";
        repeatPasswordRef.current!.value = "";
        navigate("/");
      }
      const validationResult = validateData(
        (re as { response: { data: { error: any } } }).response.data.error
      ) || {
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
    },
    [data]
  );

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    [data]
  );

  return (
    <section className="h-full">
      <div className=" w-full relative pt-2">
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div
          className={`fixed transform z-50 transition-transform duration-300  ${
            isMenuOpen ? "translate-x-0" : "-translate-x-96"
          }`}>
          {userInfo.is_admin ? <AdminNavigation /> : <UserNavigation />}
        </div>
        <div className="max-w-1920 flex justify-center mx-auto flex-wrap">
          <div className="px-2 xs:w-3/4 lg:w-1/2 mt-10">
            <form className=" mb-10" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-col w-full">
                <div className="mt-4">
                  <label className="text-xl">Imię</label>
                  <input
                    className={`w-full bg-white text-xl pl-2 ${
                      !name
                        ? "outline-none"
                        : "p-2 border-2 bg-white border-custom-validation-red outline-custom-validation-red"
                    }`}
                    type="text"
                    name="name"
                    onChange={handleChangeInput}
                    defaultValue={data.name}
                  />
                  {!name ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Imię jest wymagane
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="text-xl">Nazwisko</label>
                  <input
                    className={`w-full bg-white text-xl pl-2 ${
                      !surname
                        ? "outline-none"
                        : "p-2 border-2 bg-white border-custom-validation-red outline-custom-validation-red"
                    }`}
                    type="text"
                    name="surname"
                    onChange={handleChangeInput}
                    defaultValue={data.surname}
                  />
                  {!surname ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Nazwisko jest wymagane
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="text-xl">Email</label>
                  <input
                    className={`w-full bg-white text-xl pl-2 ${
                      !email
                        ? "outline-none"
                        : "p-2 border-2 bg-white border-custom-validation-red outline-custom-validation-red"
                    }`}
                    type="email"
                    name="email"
                    onChange={handleChangeInput}
                    defaultValue={data.email}
                  />
                  {!email ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Niepoprawny email
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="text-xl">Hasło</label>
                  <input
                    ref={passwordRef}
                    className={`w-full bg-white text-xl pl-2 ${
                      !password
                        ? "outline-none"
                        : "p-2 border-2 bg-white border-custom-validation-red outline-custom-validation-red"
                    }`}
                    type="password"
                    name="password"
                    onChange={handleChangeInput}
                  />
                  {!password ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Hasło musi składać się z 6-20 znaków, zawierać co najmniej
                      jedną małą literę, jedną dużą literę i jedną cyfrę
                    </p>
                  )}

                  <p>
                    Jeśli chcesz pozostawić hasło niezmienione pozostaw pole
                    puste
                  </p>
                </div>
                <div className="mt-4">
                  <label className="text-xl">Powtórz hasło</label>
                  <input
                    ref={repeatPasswordRef}
                    className={`w-full bg-white text-xl pl-2 ${
                      !repeatPassword
                        ? "outline-none"
                        : "p-2 border-2 bg-white border-custom-validation-red outline-custom-validation-red"
                    }`}
                    type="password"
                    name="repeatPassword"
                    onChange={handleChangeInput}
                  />
                  {!repeatPassword ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Hasła nie zgadzają się
                    </p>
                  )}

                  <p>
                    Jeśli chcesz pozostawić hasło niezmienione pozostaw pole
                    puste
                  </p>
                </div>
                <div className="mt-4">
                  <label className="text-xl">Nazwa użytkownika</label>
                  <input
                    className={`w-full bg-white text-xl pl-2 ${
                      !nickname
                        ? "outline-none"
                        : "p-2 border-2 bg-white border-custom-validation-red outline-custom-validation-red"
                    }`}
                    type="text"
                    name="nickname"
                    onChange={handleChangeInput}
                    defaultValue={data.nickname}
                  />
                  {!nickname ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Nazwa użytkownika jest wymagana i może zawierać
                      maksymalnie 15 znaków
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="text-xl">Numer telefonu</label>
                  <input
                    className={`w-full bg-white text-xl pl-2 ${
                      !phone
                        ? "outline-none"
                        : "p-2 border-2 bg-white border-custom-validation-red outline-custom-validation-red"
                    }`}
                    type="text"
                    name="phone"
                    onChange={handleChangeInput}
                    defaultValue={data.phone}
                  />
                  {!phone ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Numer telefonu jest wymagany i może zawierać maksymalnie 9
                      cyfr
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="text-xl">Data urodzenia</label>
                  <input
                    className={`w-full bg-white text-xl pl-2 ${
                      !dateOfBirth
                        ? "outline-none"
                        : "p-2 border-2 bg-white border-custom-validation-red outline-custom-validation-red"
                    }`}
                    type="date"
                    name="dateOfBirth"
                    onChange={handleChangeInput}
                    defaultValue={
                      data.date_of_birth ? data.date_of_birth.split("T")[0] : ""
                    }
                  />

                  {!dateOfBirth ? null : (
                    <p className="text-custom-validation-red font-bold md:text-2xl">
                      Niepoprawna data
                    </p>
                  )}
                </div>

                <button type="submit" className="mt-4 py-4 px-4 form-button ">
                  Edytuj
                </button>
              </div>
            </form>
            <p>Każda zmiana danych konta spowoduje wylogowanie !!!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
