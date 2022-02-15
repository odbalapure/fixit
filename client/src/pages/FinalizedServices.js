import axios from "axios";
import { useEffect, useState } from "react";

const url = process.env.REACT_APP_API_URL + "/finalized";

function FinalizedServices() {
  const [pickups, setPickups] = useState([]);
  const [warning, setWarning] = useState("");

  /**
   * @desc Get pickup data
   */
  const getAllPickups = async () => {
    setWarning("");
    try {
      if (JSON.parse(localStorage.getItem("fixit_user"))) {
        const response = await axios.get(url, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("fixit_user")).token,
          },
        });

        console.log(response.data.services);
        setPickups(response.data.services);
      }
    } catch (err) {
      setWarning(
        "Something went wrong while getting list of finalized services!"
      );
    }
  };

  useEffect(() => {
    getAllPickups();
  }, []);

  /**
   * @desc Send invoice via mail
   */
  const sendInvoice = async (pickup) => {
    try {
      if (JSON.parse(localStorage.getItem("fixit_user"))) {
        await axios.post(url, pickup, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("fixit_user")).token,
          },
        });
      }
    } catch (err) {
      setWarning(
        "Something went wrong while sending the invoice!"
      );
    }
  };

  return (
    <>
      <div
        style={{ marginTop: "7rem", marginLeft: "2rem", marginRight: "2rem" }}
      >
        <table className="table table-striped table-hover">
          <thead style={{ fontSize: "1.3rem", backgroundColor: "#70848c" }}>
            <tr>
              <th scope="col" style={{ textAlign: "center" }}>
                Service ID
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                User Details
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Service Details
              </th>
              <th scope="col" style={{ width: "10rem" }}>
                Send Invoice
              </th>
            </tr>
          </thead>
          <tbody>
            {pickups.map((pickup) => {
              return (
                <tr key={pickup._id}>
                  <td
                    style={{
                      width: "0.5rem",
                      textAlign: "center",
                      fontSize: "0.85rem",
                      backgroundColor: "#8ea1ab",
                    }}
                  >
                    <b>{pickup._id}</b>
                  </td>
                  <td>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <p>
                        <b style={{ fontSize: "1.1rem" }}>{pickup.name}</b>
                      </p>
                      <p>
                        <b>{pickup.mobile}</b>
                      </p>
                      <p style={{ fontSize: "0.9rem" }} className="text-muted">
                        {pickup.address}
                      </p>
                      <p style={{ fontSize: "0.9rem" }} className="text-muted">
                        {pickup.pincode}
                      </p>
                    </div>
                  </td>
                  <td className="d-flex flex-wrap justify-content-around">
                    {pickup.services.map((service) => {
                      return (
                        <div key={service._id}>
                          <p style={{ fontSize: "1.1rem" }} className="fw-bold">
                            {service.vehicle.model} ({service.vehicle.brand})
                          </p>
                          <p>
                            <b>
                              <i>{service.name}</i>
                            </b>
                          </p>
                          <p>
                            <b>
                              Cost: ₹{service.cost} ({service.time}hrs)
                            </b>
                          </p>
                          <div>
                            <p>
                              <b>Features</b>:
                            </p>
                            {service.features.map((feature) => {
                              return (
                                <p
                                  style={{ fontSize: "0.9rem" }}
                                  className="text-muted"
                                  key={feature._id}
                                >
                                  {feature.name}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    <button
                      style={{ width: "8rem" }}
                      className="btn btn-success mb-3"
                      onClick={() => sendInvoice(pickup)}
                    >
                      Send Invoice
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
    </>
  );
}

export default FinalizedServices;
