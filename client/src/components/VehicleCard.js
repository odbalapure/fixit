import { useGlobalContext } from "../context";
import axios from "axios";

function VehicleCard({ _id, name, cost, time, image, features, model, brand }) {
  const { isLoggedIn } = useGlobalContext();

  /**
   * @desc Add service to cart
   */
  const addService = async () => {
    if (localStorage.getItem("fixit_user")) {
      const url =
        process.env.REACT_APP_API_URL +
        `/cart/add/${JSON.parse(localStorage.getItem("fixit_user")).cartId}`;

      const services = {
        name,
        vehicle: {
          model,
          brand,
        },
        time,
        cost,
        features,
      };

      await axios.patch(url, services, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("fixit_user")).token,
        },
      });
    }
  };

  return (
    <div className="m-2 card">
      <div className="card-header fs-4 fw-bold">
        {name}
        <span className="fs-5" style={{ color: "gray" }}>
          &nbsp; (Time: {time}hrs)
        </span>
      </div>
      <div className="card-body d-flex justify-content-around flex-wrap">
        <div className="col-lg-4">
          <img
            style={{ maxWidth: "20rem", margin: "0 auto" }}
            alt={name}
            src={image}
          />
        </div>
        <div>
          <div style={{ width: "10rem" }}>
            {features.map((feature) => {
              return (
                <p className="m-2" key={feature.name}>
                  <i
                    style={{ color: "green", paddingRight: "0.3rem" }}
                    className="bi bi-patch-check-fill"
                  ></i>
                  {feature.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>
          <b>Cost</b>: ₹{cost}
        </h5>
        {isLoggedIn ? (
          <button
            className="btn btn-danger"
            onClick={() => {
              addService();
            }}
          >
            Add to cart <i className="bi bi-plus-lg"></i>
          </button>
        ) : (
          <p className="text-secondary">
            <i>
              <b>NOTE</b>: You need to login to add a service
            </i>
          </p>
        )}
      </div>
    </div>
  );
}

export default VehicleCard;
