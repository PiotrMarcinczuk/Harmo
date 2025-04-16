import { useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import {
  RegisterValidationData,
  type RegisterData,
} from "../interfaces/app_interfaces";
import RegisterValidation from "../validation/RegisterValidation";
import UserAPI from "../api/UserAPI";
import { useParams, useNavigate } from "react-router-dom";

const RegisterCollaborator = memo(function RegisterCollaborator({
  setComponentType,
  tempData,
  isCreating,
}: any) {
  const [data, setData] = useState<RegisterData>({
    name: (tempData && tempData.name) || "",
    email: (tempData && tempData.email) || "",
    dateOfBirth: (tempData && tempData.date_of_birth) || "",
    password: "",
    surname: (tempData && tempData.surname) || "",
    nickname: (tempData && tempData.nickname) || "",
    phone: (tempData && tempData.phone) || "",
    repeatPassword: (tempData && tempData.repeatPassword) || "",
    assignedUserId: (tempData && tempData.user_id) || [],
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

  const { registerCollaborator, updateUser } = UserAPI();
  const { validateData } = RegisterValidation();
  const { timetableId } = useParams();
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tempData && !isCreating) {
      navigate(`/plan/${timetableId}/lista-uzytkownikow`);
    }
  }, []);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    [data]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let re: any = isCreating
        ? await registerCollaborator({
            ...data,
            timetableId: parseInt(timetableId || ""),
            userId: userInfo.user_id,
          })
        : await updateUser({
            ...data,
            password: data.password !== "" ? data.password : undefined,
            repeatPassword:
              data.repeatPassword !== "" ? data.repeatPassword : undefined,
            timetableId: parseInt(timetableId || "0"),
            assignedUserId: data.assignedUserId,
            userId: userInfo.user_id,
          });

      if (re && typeof re === "object" && "data" in re) {
        setComponentType("CollaboratorsList");
        navigate(`/plan/${timetableId}/lista-uzytkownikow`);
      }
      const validationResult = validateData(re?.response?.data?.error) || {
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
      if (!re) setComponentType("CollaboratorsList");
    },
    [data]
  );

  return (
    <div className="w-full">
      <form
        className="px-2 mb-10 mx-auto md:px-0 md:w-1/2"
        onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col w-full">
          <div className="mt-4">
            <label className="text-xl">Imię</label>
            <input
              className={`w-full bg-white text-xl pl-2 ${
                !name
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
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
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
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
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
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
              className={`w-full bg-white text-xl pl-2 ${
                !password
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
              }`}
              type="password"
              name="password"
              onChange={handleChangeInput}
            />
            {!password ? null : (
              <p className="text-custom-validation-red font-bold md:text-2xl">
                Hasło musi składać się z 6-20 znaków, zawierać co najmniej jedną
                małą literę, jedną dużą literę i jedną cyfrę
              </p>
            )}
            {!isCreating && (
              <p>
                Jeśli chcesz pozostawić hasło niezmienione pozostaw pole puste
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-xl">Powtórz hasło</label>
            <input
              className={`w-full bg-white text-xl pl-2 ${
                !repeatPassword
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
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
            {!isCreating && (
              <p>
                Jeśli chcesz pozostawić hasło niezmienione pozostaw pole puste
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-xl">Nazwa użytkownika</label>
            <input
              className={`w-full bg-white text-xl pl-2 ${
                !nickname
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
              }`}
              type="text"
              name="nickname"
              onChange={handleChangeInput}
              defaultValue={data.nickname}
            />
            {!nickname ? null : (
              <p className="text-custom-validation-red font-bold md:text-2xl">
                Nazwa użytkownika jest wymagana i może zawierać maksymalnie 15
                znaków
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-xl">Numer telefonu</label>
            <input
              className={`w-full bg-white text-xl pl-2 ${
                !phone
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
              }`}
              type="text"
              name="phone"
              onChange={handleChangeInput}
              defaultValue={data.phone}
            />
            {!phone ? null : (
              <p className="text-custom-validation-red font-bold md:text-2xl">
                Numer telefonu jest wymagany i może zawierać maksymalnie 9 cyfr
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-xl">Data urodzenia</label>
            <input
              className={`w-full bg-white text-xl pl-2 ${
                !dateOfBirth
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
              }`}
              type="date"
              name="dateOfBirth"
              onChange={handleChangeInput}
              defaultValue={data.dateOfBirth.split("T")[0]}
            />

            {!dateOfBirth ? null : (
              <p className="text-custom-validation-red font-bold md:text-2xl">
                Niepoprawna data
              </p>
            )}
          </div>

          <button type="submit" className="mt-4 py-4 px-4 form-button ">
            {isCreating ? "Dodaj" : "Edytuj"}
          </button>
        </div>
      </form>
    </div>
  );
});

export default RegisterCollaborator;
