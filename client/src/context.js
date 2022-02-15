import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/vehicles";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [warning, setWarning] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  /**
   * @desc Check if a user is logged in
   */
  useEffect(() => {
    if (localStorage.getItem("fixit_user")) {
      if (JSON.parse(localStorage.getItem("fixit_user")).name !== "") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  /**
   * @desc  Get vehicles
   * @request GET
   */
  const getVehicles = useCallback(async () => {
    try {
      const response = await axios.get(`${url}?brand=${search}`);
      setVehicles(response.data.vehicles);
      setWarning("");
    } catch (err) {
      setWarning("Something went wrong while fetching the vehicles...");
    }
  }, [search]);

  useEffect(() => {
    getVehicles();
  }, [search, getVehicles]);

  /**
   * @desc Get cart items
   */
  const getCartItems = async () => {
    const url = process.env.REACT_APP_API_URL + "/cart";

    if (JSON.parse(localStorage.getItem("fixit_user"))) {
      const response = await axios.get(url, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("fixit_user")).token,
        },
      });

      setCartItems(response.data.services);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <AppContext.Provider
      value={{
        vehicles,
        getVehicles,
        search,
        setSearch,
        warning,
        isLoggedIn,
        getCartItems,
        cartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
