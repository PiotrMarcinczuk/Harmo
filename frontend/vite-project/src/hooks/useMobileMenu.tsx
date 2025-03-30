import { useState, useEffect, useCallback } from "react";

export default function useMobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [xlMenu, setXlMenu] = useState(true);

  const changeMenuState = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 768) {
      setIsMenuOpen(false);
      setMobileMenu(true);
      setXlMenu(false);
    } else if (width < 1400) {
      setIsMenuOpen(false);
      setXlMenu(false);
    } else {
      setIsMenuOpen(true);
      setXlMenu(true);
      setMobileMenu(false);
    }

    const handleResize = () => {
      width = window.innerWidth;
      if (width < 768) {
        setIsMenuOpen(false);
        setMobileMenu(true);
        setXlMenu(false);
      } else if (width < 1400) {
        setIsMenuOpen(false);
        setXlMenu(false);
      } else {
        setIsMenuOpen(true);
        setXlMenu(true);
        setMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMenuOpen, setIsMenuOpen: changeMenuState, xlMenu, mobileMenu };
}
