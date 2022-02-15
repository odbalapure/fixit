import React, { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/pickup";

function PickupList() {
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

        setPickups(response.data.pickups);
      }
    } catch (err) {
      setWarning("Something went wrong while getting list of pickups!");
    }
  };

  /**
   * @desc Confirm the pickup
   */
  const confirmPickup = async (pickupId, customerMobile) => {
    try {
      if (JSON.parse(localStorage.getItem("fixit_user"))) {
        const url = process.env.REACT_APP_API_URL + "/status/confirm";

        await axios.patch(
          `${url}/${pickupId}`,
          {
            status: "CONFIRMED",
            customerMobile 
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("fixit_user")).token,
            },
          }
        );
      }
    } catch (err) {
      setWarning("Something went wrong while getting list of pickups!");
    }
  };

  /**
   * @desc Mark service as started
   */
  const startService = async (pickupId) => {
    try {
      if (JSON.parse(localStorage.getItem("fixit_user"))) {
        const url = process.env.REACT_APP_API_URL + "/status/start";

        await axios.patch(
          `${url}/${pickupId}`,
          {
            status: "STARTED",
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("fixit_user")).token,
            },
          }
        );
      }
    } catch (err) {
      setWarning("Something went wrong while getting list of pickups!");
    }
  };

  /**
   * @desc Mark service as finished
   */
  const finishService = async (pickupId) => {
    try {
      if (JSON.parse(localStorage.getItem("fixit_user"))) {
        const url = process.env.REACT_APP_API_URL + "/status/finish";

        await axios.patch(
          `${url}/${pickupId}`,
          {
            status: "FINISHED",
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("fixit_user")).token,
            },
          }
        );
      }
    } catch (err) {
      setWarning("Something went wrong while getting list of pickups!");
    }
  };

  /**
   * @desc Reject a pickup/service
   */
  const rejectService = async (pickupId) => {
    try {
      if (JSON.parse(localStorage.getItem("fixit_user"))) {
        const url = process.env.REACT_APP_API_URL + "/status/reject";

        await axios.patch(
          `${url}/${pickupId}`,
          {
            status: "REJECTED",
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("fixit_user")).token,
            },
          }
        );
      }
    } catch (err) {
      setWarning("Something went wrong while getting list of pickups!");
    }
  };

  useEffect(() => {
    getAllPickups();
  }, []);

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
              <th scope="col" style={{ width: "5rem" }}>
                Status
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
                      style={{ width: "5rem" }}
                      onClick={() => confirmPickup(pickup._id, pickup.mobile)}
                      className="btn btn-success mb-3"
                    >
                      Confirm
                    </button>
                    <button
                      style={{ width: "5rem" }}
                      onClick={() => startService(pickup._id)}
                      className="btn btn-warning mb-3"
                    >
                      Start
                    </button>
                    <button
                      style={{ width: "5rem" }}
                      onClick={() => finishService(pickup._id)}
                      className="btn btn-info mb-3"
                    >
                      Finish
                    </button>
                    <button
                      style={{ width: "5rem" }}
                      onClick={() => rejectService(pickup._id)}
                      className="btn btn-danger"
                    >
                      Reject
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

export default PickupList;
