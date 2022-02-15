import Login from "./components/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Services from "./pages/Services";
import Cart from "./components/Cart";
import ConfirmPickup from "./components/ConfirmPickup";
import PickupList from "./pages/PickupList";
import MyServices from "./pages/MyServices";
import FinalizedServices from "./pages/FinalizedServices";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<ConfirmPickup />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/pickup" element={<PickupList />}></Route>
          <Route path="/my-services" element={<MyServices />}></Route>
          <Route path="/finalized-services" element={<FinalizedServices />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/reset-password/:email"
            element={<ResetPassword />}
          ></Route>
          <Route path="/services" element={<Services />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
