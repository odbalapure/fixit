import axios from "axios";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ConfirmPickup() {
  const location = useLocation();
  const nameRef = useRef();
  const mobileRef = useRef();
  const addressRef = useRef();
  const pincodeRef = useRef();
  const [msg, setMsg] = useState("");
  const [warning, setWarning] = useState("");

  /**
   * @desc Function to confirm pickup/order
   */
  const confirmPickup = async () => {
    setWarning("");
    const order = {
      name: "",
      mobile: "",
      address: "",
      pincode: "",
      services: location.state,
    };

    if (
      nameRef.current.value === "" ||
      mobileRef.current.value === "" ||
      addressRef.current.value === "" ||
      pincodeRef.current.value === ""
    ) {
      setWarning("All the fields are mandatory to enter!");
      setMsg("");
      return;
    }

    order.name = nameRef.current.value;
    order.mobile = mobileRef.current.value;
    order.address = addressRef.current.value;
    order.pincode = pincodeRef.current.value;

    if (JSON.parse(localStorage.getItem("fixit_user"))) {
      const url =
        process.env.REACT_APP_API_URL +
        `/pickup/${JSON.parse(localStorage.getItem("fixit_user")).cartId}`;

      await axios.post(url, order, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("fixit_user")).token,
        },
      });

      setWarning("");
      setMsg("Pickup confirmed, you will get a confirmation via an SMS!");
    }
  };

  // Start servicing
  // End service - dispatching soon

  return (
    <div
      className="d-flex flex-wrap justify-content-around"
      style={{ marginTop: "5.5rem" }}
    >
      <form
        className="border border-primary"
        style={{
          margin: "2rem",
          padding: "2rem",
          borderRadius: "1rem",
          width: "30rem",
        }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter full name"
            ref={nameRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            placeholder="Enter mobile number"
            ref={mobileRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter your address"
            ref={addressRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">
            Pincode
          </label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            placeholder="Enter pincode"
            ref={pincodeRef}
          />
        </div>
        {!msg ? (
          <div className="d-flex justify-content-center d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              style={{ width: "80%" }}
              onClick={confirmPickup}
            >
              Confirm Pickup
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-center flex-column pt-5">
            <p
              className="alert alert-success"
              role="alert"
            >
              {msg}
            </p>
            <Link to="/">
              <button className="btn btn-success">Back to Home</button>
            </Link>
          </div>
        )}
        {warning ? (
          <p
            className="d-flex justify-content-center alert alert-danger mt-3"
            role="alert"
          >
            {warning}
          </p>
        ) : null}
      </form>
      <div
        className="d-flex justify-content-center flex-column p-4 border border-secondary"
        style={{
          margin: "2rem",
          padding: "2rem",
          borderRadius: "1rem",
          height: "15rem",
        }}
      >
        <div>
          <span className="fw-bold">Pickup Charges:</span> ₹0.00
        </div>
        <hr />
        <div>
          <p className="fs-5 fw-bolder text-danger">
            Total Service Charge: ₹{location.state.total}
          </p>
        </div>
        <hr />
        <div className="fs-6 text-muted">
          <p>NOTE: Pay only after the vehicle is delivered!</p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPickup;
