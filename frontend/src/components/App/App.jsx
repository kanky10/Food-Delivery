import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginSignup } from "../LoginSignup/LoginSignup";
import { Navbar } from "../Navbar/Navbar";
import { Header } from "../Header/Header";
import { FoodCategory } from "../FoodCategory/FoodCategory";
import { FoodDisplay } from "../FoodDisplay/FoodDisplay";
import { Footer } from "../Footer/Footer";
import { Cart } from "../Cart/Cart";
import OrderHistory from "../OrderHistory/OrderHistory";
import { StoreContextProvider } from "../../context/StoreContext";

const App = () => {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <div>
      <StoreContextProvider>
        <BrowserRouter>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <FoodCategory />
                <FoodDisplay />
                <Footer />
              </>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
          {showLogin && <LoginSignup setShowLogin={setShowLogin} />}
        </BrowserRouter>
      </StoreContextProvider>
    </div>
  );
};

export default App; 