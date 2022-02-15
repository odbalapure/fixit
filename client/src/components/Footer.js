function Footer() {
  
  /* Footer style */
  const footerStyle = {
    paddingTop: "1rem",
    fontSize: "1rem",
    color: "rgb(158, 187, 187)",
    backgroundColor: "#1a2538",
    left: 0,
    bottom: 0,
    width: "100%",
  };

  return (
    <div>
      <div style={footerStyle}>
        <div className="container">
          <div
            className="d-flex justify-content-center align-items-center flex-wrap"
            style={{ padding: "1rem", textAlign: "center" }}
          >
            <div>
              <p>
                <big>
                  <b>
                    <u>Contact</u>
                  </b>
                </big>
              </p>
              <ol style={{ listStyle: "none", padding: 0, cursor: "pointer" }}>
                <li>
                  <span>
                    <b>Phone</b>
                  </span>
                  : +91-1231231230
                </li>
                <li>
                  <span>
                    <b>Instagram ID</b>
                  </span>
                  : fixit-please
                </li>
                <li>
                  <span>
                    <b>Email</b>
                  </span>
                  : fixit@gmail.com
                </li>
              </ol>
            </div>
          </div>
          <hr />
          <p
            style={{
              color: "#fff",
              fontSize: "1.5rem",
              textAlign: "center",
              paddingBottom: "2rem",
            }}
          >
            <b>FixIt ©</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
