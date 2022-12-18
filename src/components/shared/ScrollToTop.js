import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
  }, [pathname]);

  return null;
}
