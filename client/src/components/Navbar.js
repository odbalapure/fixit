import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import cog from "../images/cog.svg";

function Navbar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/", { replace: true });
  const { cartItems, isLoggedIn } = useGlobalContext();
  const [isAdmin, setIsAdmin] = useState(false);

  /**
   * @desc Check if a user is admin or not
   */
  useEffect(() => {
    if (localStorage.getItem("fixit_user")) {
      if (JSON.parse(localStorage.getItem("fixit_user")).role === "Admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  /**
   * @desc Diplay name of logged in user
   */
  useEffect(() => {
    if (localStorage.getItem("fixit_user")) {
      setUsername(
        JSON.parse(localStorage.getItem("fixit_user")).name.split(" ")[0]
      );
    }
  }, [username]);

  /* Function to logout user */
  const logoutUser = () => {
    localStorage.removeItem("fixit_user");
    navigateToHome();
    window.location.reload(true);
  };

  return (
    <nav
      style={{ boxShadow: "1px 24px 96px -16px rgba(0,0,0,0.75)" }}
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={cog}
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          <span className="fw-bold fs-3">FixIt</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/services">
                Services
              </Link>
            </li>
            {isLoggedIn && !isAdmin ? (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/cart">
                  Cart ({cartItems.length})
                </Link>
              </li>
            ) : null}
            {!isAdmin && isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/my-services">
                  My Services
                </Link>
              </li>
            ) : null}
            {isAdmin ? (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/pickup">
                  Pickups
                </Link>
              </li>
            ) : null}
            {isAdmin ? (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/finalized-services">
                  Finalized Services
                </Link>
              </li>
            ) : null}
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
          {username ? (
            <div className="d-flex align-items-center">
              <span className="fs-5">
                Hello <i className="text text-primary fw-bold">{username}</i>!
              </span>
              &nbsp;&nbsp;
              <button
                onClick={logoutUser}
                className="btn btn-outline-danger"
                type="submit"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
