import { useApplicationContext } from "../context/DataContext";
import UserStatus from "./UserStatus";

const Header = ({ title }) => {
  const { userName, isLoading } = useApplicationContext();

  return (
    <>
      { isLoading ?
        <div className="loader">
          <div className="loading"></div>
        </div>
        : null
      }
      <header className="Header">
        <h1>{title}</h1>
        <UserStatus userName={userName} />
      </header>
    </>
  )
}

export default Header;
