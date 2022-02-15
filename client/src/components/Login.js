import axios from "axios";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_API_URL + "/auth/login";

function Login() {
  const [msg, setMsg] = useState("");
  const [warning, setWarning] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const navigateToUrls = () => navigate("/", { replace: true });

  /**
   * @desc Login a user
   * @param {*} event
   * @returns
   */
  const loginDetails = async (event) => {
    setMsg("Logging you in, please wait...");
    event.preventDefault();

    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      setMsg("");
      setWarning("Email and password are mandatory!");
      return;
    }

    setWarning("");

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(`${url}`, user);
      const localStorageObj = {
        name: response.data.name,
        email: response.data.email,
        token: response.data.token,
        role: response.data.role,
        cartId: response.data.cartId,
      };

      localStorage.setItem("fixit_user", JSON.stringify(localStorageObj));

      setMsg("");
      navigateToUrls();
      window.location.reload();
    } catch (error) {
      setMsg("");
      setWarning("User may not exist or the account has not been verified!");
    }
  };

  return (
    <div className="container d-flex justify-content-center flex-wrap flex-column">
      <div
        style={{
          border: "1px solid lightgray",
          boxShadow: "-1px 50px 144px -22px rgba(0,0,0,0.75)",
          padding: "1rem",
          margin: "2rem",
          borderRadius: "1rem",
          marginTop: "7rem",
        }}
      >
        <form className="py-5">
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              ref={passwordRef}
            />
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <Link to="/signup">
                <button
                  style={{
                    color: "dodgerblue",
                    fontWeight: "600",
                    borderStyle: "none",
                    backgroundColor: "#fff",
                  }}
                >
                  <u>Create Account</u>
                </button>
              </Link>
              |
              <Link to="/forgot-password">
                <button
                  style={{
                    color: "#f76865",
                    fontWeight: "600",
                    borderStyle: "none",
                    backgroundColor: "#fff",
                  }}
                >
                  <u>Forgot Password</u>
                </button>
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={loginDetails}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div>
        {warning ? (
          <p
            className="d-flex justify-content-center alert alert-danger"
            role="alert"
          >
            {warning}
          </p>
        ) : null}
      </div>
      <div>
        {msg ? (
          <p
            className="d-flex justify-content-center alert alert-primary fs-4"
            role="alert"
          >
            {msg}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Login;

// await axios.post(`${url}`, user, {
//   headers: {
//     Authorization:
//       "Bearer " + JSON.parse(localStorage.getItem("url_shortner_user")).token,
//   },
// });
