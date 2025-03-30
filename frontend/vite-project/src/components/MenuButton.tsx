import arrow from "/image/arrow.svg";

export default function MenuButton({ isMenuOpen, setIsMenuOpen }: any) {
  return (
    <div className="">
      <button
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <img src={arrow} alt="arrow" className="z-50 mr-4"></img>
        <span className="z-50 text-center text-2xl font-bold">
          {isMenuOpen ? "Zamknij Menu" : "Otwórz Menu"}
        </span>
      </button>
    </div>
  );
}
