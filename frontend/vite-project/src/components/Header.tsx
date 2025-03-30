import UserAPI from "../api/UserAPI";
import { memo } from "react";

const Header = memo(function Header() {
  const { getUser } = UserAPI();
  const user = getUser();
  const name = user ? user.name : null;
  return (
    <header className="w-screen bg-custom-purple">
      <section className="max-w-1920 mx-auto relative">
        <div className="flex mx-4">
          {/* <div className="w-1/2 flex justify-start">
            <div className="w-20 h-20">
              <img src={logoSrc} alt="logo" />
            </div>
          </div> */}
          <div className="w-full flex justify-end">
            <div className="text-2xl sm:text-4xl font-semibold">
              <p>Witaj</p>
              <p>{name ? name : "użytkowniku"}</p>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
});

export default Header;
