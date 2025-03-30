import { useNavigate } from "react-router-dom";

export default function RegisterdAccount() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <main>
        <section className="max-w-1732 mx-auto">
          <div className="text-center bg-custom-blue-gradient mt-10">
            <h1 className="text-center pt-4 text-5xl font-semibold">
              Twoje konto zostało zarejestrowane
            </h1>
            <p className="text-center text-2xl mt-2">
              Kliknij przycisk poniżej aby przejść do logowania
            </p>
            <button
              className="form-button p-2 mt-32 mb-10"
              onClick={handleClick}>
              Logowanie
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
