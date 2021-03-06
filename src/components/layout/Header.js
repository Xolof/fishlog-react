import { useApplicationContext } from "../../context/DataContext";
import { useUserContext } from "../../context/UserContext";
import UserStatus from "./UserStatus";
import { useLocation } from "react-router-dom";

const Header = ({ title }) => {
  const { userName } = useUserContext();
  const { isLoading } = useApplicationContext();
  const location = useLocation();
  const notLoadingRoutes = ["/add", "/login", "/about"];

  return (
    <>
      {isLoading && !notLoadingRoutes.includes(location.pathname) ? (
        <div className="loader">
          <div className="loading"></div>
        </div>
      ) : null}
      <header className="Header">
        <h1>{title}</h1>
        <UserStatus userName={userName} />
      </header>
    </>
  );
};

export default Header;
