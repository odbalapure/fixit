import axios from "axios";
import { useState } from "react";
import VehicleCard from "../components/VehicleCard";
import { useGlobalContext } from "../context";

const url = process.env.REACT_APP_API_URL + "/services";

function Services() {
  const { setSearch, vehicles } = useGlobalContext();
  const [services, setServices] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [warning, setWarning] = useState("");

  const getBrand = (e) => {
    setBrand(e.target.value);
    setSearch(e.target.value);
  };

  const getModel = (e) => {
    setModel(e.target.value);
  };

  /**
   * @desc Get services for a vehicle
   */
  const getServices = async () => {
    if (model === "" || brand === "") {
      setWarning("Please select both the options to continue!");
      return;
    }

    try {
      const response = await axios.get(`${url}?brand=${brand}&model=${model}`);
      setServices(response.data.services.services);
      setWarning("");
    } catch (err) {
      setWarning("Something went wrong while fetching the vehicles...");
    }
  };

  return (
    <>
      <div
        className="jumbotron p-5 rounded"
        style={{ marginTop: "4rem", backgroundColor: "#add3ff" }}
      >
        <h1 className="fs-3">Hi there!</h1>
        <p className="lead">
          Select the manufacturer and the vehicle model to browse services
        </p>
        <div>
          <select
            onChange={getBrand}
            className="form-select"
            aria-label="Default select example"
          >
            <option>Select Brand</option>
            <option value="honda">Honda</option>
            <option value="suzuki">Suzuki</option>
            <option value="mahindra">Mahindra</option>
            <option value="hero">Hero</option>
          </select>
          <select
            onChange={getModel}
            className="form-select"
            aria-label="Default select example"
          >
            <option>Select Vehicle Model</option>
            {brand
              ? vehicles.map((vehicle) => {
                  return (
                    <option
                      className="list-group-item list-group-item-info"
                      key={vehicle._id}
                      value={vehicle.name}
                    >
                      {vehicle.name}
                    </option>
                  );
                })
              : null}
          </select>
          <div className="d-grid gap-2 mt-4">
            <button
              onClick={getServices}
              className="btn btn-primary"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
        {warning ? (
          <p
            className="d-flex mt-4 justify-content-center alert alert-danger"
            role="alert"
          >
            {warning}
          </p>
        ) : null}
      </div>
      <div>
        {services.map((service) => {
          return (
            <VehicleCard
              key={service.name}
              {...service}
              brand={brand}
              model={model}
            ></VehicleCard>
          );
        })}
      </div>
    </>
  );
}

export default Services;
