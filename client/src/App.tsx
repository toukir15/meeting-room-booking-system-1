import Notiflix from "notiflix";
import MainLayout from "./components/layout/MainLayout";

export default function App() {
  Notiflix.Loading.init({
    svgColor: "#F54361",
  });
  return (
    <>
      <MainLayout />
    </>
  );
}
