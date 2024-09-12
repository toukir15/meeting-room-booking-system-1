import Notiflix from "notiflix";
import MainLayout from "./components/layout/MainLayout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  Notiflix.Loading.init({
    svgColor: "#F54361",
  });

  return (
    <div>
      <MainLayout />
    </div>
  );
}
