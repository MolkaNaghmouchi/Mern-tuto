import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Register from "../pages/Register";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" > GoalSetter </Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> <Register></Register>
          </Link>
        </li>
      </ul>
      Header
    </header>
  );
}

export default Header;
