import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { ToastContainer } from "react-toastify";
import { infoToast } from "../../services/toastService";

const Nav = () => {
  const { userName, setUserName, setMarkerLocation } = useUserContext();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("fishlog-token");
    localStorage.removeItem("fishlog-userName");
    setUserName(false);
    setMarkerLocation(null);
    infoToast("You have been logged out.");
  }

  return (
    <>
      <ToastContainer />
      <nav>
        <ul className="navLinks">
          <li>
            <NavLink to="/" activeclassname="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeclassname="active">
              Add
            </NavLink>
          </li>
          <li>
            <NavLink to="/list" activeclassname="active">
              List
            </NavLink>
          </li>
          <li>
            <NavLink to="/map/all" activeclassname="active">
              Map
            </NavLink>
          </li>
          <li>
            {userName ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <NavLink to="/login" activeclassname="active">
                Login
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/about" activeclassname="active">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
