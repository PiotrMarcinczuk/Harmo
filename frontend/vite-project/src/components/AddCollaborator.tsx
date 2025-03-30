import { useState, useCallback } from "react";
import UserAPI from "../api/UserAPI";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function AddCollaborator({ setComponentType }: any) {
  const [data, setData] = useState<any>({
    email: "",
  });
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const { addColaborator } = UserAPI();
  const { timetableId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res: any = await addColaborator(data.email, Number(timetableId));
      if (res && res.status === 200) {
        setComponentType("CollaboratorsList");
        navigate(`/plan/${timetableId}/lista-uzytkownikow`);
      }
      if (res && res.response && res.response.data.error) {
        if (res.response.data.error.email === true) {
          setEmailValid(true);
        }
      }
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
    <div className="w-full mt-10">
      <form
        className="px-4 mx-auto mb-10 md:px-0 sm:w-1/2"
        onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col w-full">
          <label className="text-xl">
            Email użytkownika którego chcesz dodać
          </label>
          <input
            className={`w-full bg-white text-xl pl-2 ${
              !emailValid
                ? "outline-none"
                : "p-2 border-2 bg-white border-custom-validation-red outline-custom-validation-red"
            }`}
            type="text"
            name="email"
            onChange={(e) => handleChangeInput(e)}
          />
          {!emailValid ? null : (
            <p className="text-custom-validation-red font-bold md:text-2xl">
              Podany email jest nieprawidłowy, prawdopodobnie użytkownik o
              podanym adresie email nie istnieje
            </p>
          )}
          <button type="submit" className="mt-4 py-4 px-4 form-button ">
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
}
