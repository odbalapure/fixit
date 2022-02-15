import React, { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/status";

function MyServices() {
  const [pickups, setPickups] = useState([]);

  /**
   * @desc Get pickup data and check status
   */
  const getPick = async () => {
    try {
      if (JSON.parse(localStorage.getItem("fixit_user"))) {
        const response = await axios.get(url, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("fixit_user")).token,
          },
        });

        setPickups(response.data.services);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getPick();
  }, []);

  return (
    <>
      <div className="container" style={{ marginTop: "7rem", marginBottom: "4rem" }}>
        <div className="card">
          <div className="card-body">
            {pickups.map((pickup) => {
              return (
                <div
                  className="d-flex justify-content-between flex-column"
                  key={pickup._id}
                >
                  <div
                    style={{ backgroundColor: "#8997ad" }}
                    className="d-flex justify-content-between card-header"
                  >
                    <div className="fs-5">
                      <b>Created At:</b>{" "}
                      {new Date().getDate() +
                        "/" +
                        new Date().getMonth() +
                        "/" +
                        new Date().getFullYear()}
                    </div>
                  </div>
                  <div
                    style={{ backgroundColor: "#d5dde8" }}
                    className="p-4 d-flex flex-wrap justify-content-between align-items-center"
                  >
                    <div>
                      {pickup.services.map((service) => {
                        return (
                          <div key={service._id}>
                            <p className="fs-4">
                              <b>
                                <span style={{ textTransform: "capitalize" }}>
                                  {service.vehicle.brand}
                                </span>{" "}
                                {service.vehicle.model}
                              </b>
                            </p>
                            <p>
                              <b>Service Type: </b>
                              {service.name}
                            </p>
                            <p>
                              <b>Cost:</b> ₹{service.cost}
                            </p>
                            <p>
                              <b>Time:</b> {service.time}hrs (approx)
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="fs-4">
                      <b>Status:</b>{" "}
                      <span>
                        <i>{pickup.status}</i>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyServices;
