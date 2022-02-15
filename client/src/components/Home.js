import banner from "../images/banner.jpg";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  const { vehicles, search, setSearch, warning } = useGlobalContext();

  /**
   * @desc Search vehicles based on selected option
   * @param {*} e
   */
  const searchVehicles = async (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        style={{
          marginTop: "4rem",
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)),
              url(${banner})`,
          height: "100vh",
        }}
        id="goto-top"
        className="d-md-flex align-items-center justify-content-around"
      >
        <div className="d-flex justify-content-center align-items-center flex-column">
          <p className="fs-1 fw-bold" style={{ marginTop: "5rem",  color: "#fff" }}>
            Welcome to <span className="text text-primary">FixIt</span>!
          </p>
          <p className="fs-6" style={{ color: "lightgray" }}>
            We offer free pick up and drop
          </p>
          <p className="fs-6" style={{ color: "lightgray" }}>
            Select from our broad portfolio of services
          </p>
        </div>
        <div
          style={{ marginTop: "3rem", marginLeft: "2rem", marginRight: "2rem", backgroundColor: "#abb9c4" }}
          className="p-5 border rounded border-secondary"
        >
          <form>
            <p className="fs-4 fw-bold">Services for following brands</p>
            <div className="mb-3">
              <select onChange={searchVehicles} className="form-select">
                <option>Select brand</option>
                <option value="honda">Honda</option>
                <option value="suzuki">Suzuki</option>
                <option value="mahindra">Mahindra</option>
                <option value="hero">Hero</option>
              </select>
            </div>
            <ul className="list-group">
              {search
                ? vehicles.map((vehicle) => {
                    return (
                      <li
                        className="list-group-item list-group-item-info"
                        key={vehicle._id}
                      >
                        {vehicle.name}
                      </li>
                    );
                  })
                : null}
            </ul>
            <Link
              to="/services"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-primary" type="button">
                  Know More
                </button>
              </div>
            </Link>
            {warning ? (
              <p
                className="d-flex justify-content-center alert alert-danger mt-2"
                role="alert"
              >
                {warning}
              </p>
            ) : null}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
