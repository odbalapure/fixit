import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, getCartItems } = useGlobalContext();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, []);

  /**
   * @desc Book services
   */
  const bookServices = async () => {
    cartItems.total = total;
    navigate("/order", { state: cartItems });
  };

  /**
   * @desc Get total cart value
   */
  useEffect(() => {
    const result = cartItems.reduce((acc, curr) => {
      acc += curr.cost;
      return acc;
    }, 0);

    setTotal(result);
  }, [cartItems]);

  /**
   * @desc Remove an item from cart
   */
  const removeCartItem = async (itemId) => {
    if (JSON.parse(localStorage.getItem("fixit_user"))) {
      const url =
        process.env.REACT_APP_API_URL +
        `/cart/remove/${JSON.parse(localStorage.getItem("fixit_user")).cartId}`;

      await axios.patch(
        url,
        { itemId },
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("fixit_user")).token,
          },
        }
      );

      getCartItems();
    }
  };

  return (
    <div>
      <div
        className="container"
        style={{
          marginTop: "7rem",
        }}
      >
        {cartItems.map((item) => {
          return (
            <div
              className="card mb-5"
              key={item._id}
              style={{ boxShadow: "10px 7px 29px -6px rgba(0,0,0,0.75)" }}
            >
              <div
                style={{ backgroundColor: "#52fab1" }}
                className="card-header d-flex justify-content-between align-items-center"
              >
                <p className="fs-4 m-1 fw-bold">
                  <i>{item.name}</i>
                </p>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => removeCartItem(item._id)}
                ></button>
              </div>

              <div className="card-body d-flex flex-wrap justify-content-around">
                <div className="m-2">
                  <p className="fs-5 fw-bold">
                    {item.vehicle.brand.charAt(0).toUpperCase() +
                      item.vehicle.brand.slice(1)}{" "}
                    {item.vehicle.model}
                  </p>
                  <p style={{ fontSize: "1.1rem" }}>
                    <b>Cost</b>: <i>₹{item.cost}</i>
                  </p>
                  <p style={{ fontSize: "1.1rem" }}>
                    <b>Time</b>: <i>{item.time}hrs</i>
                  </p>
                </div>
                <ul className="list-group m-2" style={{ width: "15rem" }}>
                  <li className="list-group-item active" aria-current="true">
                    Features
                  </li>
                  {item.features.map((feature) => {
                    return (
                      <li className="list-group-item" key={feature._id}>
                        {feature.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
        {cartItems.length === 0 ? (
          <p className="fs-3" style={{ textAlign: "center" }}>
            <b>Your cart is empty!</b>
          </p>
        ) : null}
        <hr />
        <div className="card mb-5">
          <div className="card-body p-4 d-flex flex-row flex-wrap justify-content-around align-items-center">
            <div className="fs-4">
              <b>Total</b>: ₹{total}
            </div>
            {cartItems.length >= 1 ? (
              <button
                className="btn btn-warning fs-5"
                style={{ borderRadius: "2rem", width: "11rem" }}
                onClick={bookServices}
                disabled={false}
              >
                Confirm Service
              </button>
            ) : (
              <button
                className="btn btn-warning fs-5"
                style={{ borderRadius: "2rem", width: "11rem" }}
                onClick={bookServices}
                disabled={true}
              >
                Confirm Service
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
