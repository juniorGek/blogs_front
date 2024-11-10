import "bootstrap/scss/bootstrap.scss";
import "simplebar-react/dist/simplebar.min.css";
import "./styles/app.scss";
import Preloader from "./components/common/preloader";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Preloader />
      {children}
    </>
  );
}
