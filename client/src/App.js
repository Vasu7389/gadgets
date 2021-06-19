import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./bootstrap.min.css";
import { Container } from "react-bootstrap";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomeScreen from "./components/HomeScreen";
import ProductDetail from "./components/ProductDetail";
import CartScreen from "./components/CartScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ProfileScreen from "./components/ProfileScreen";
import ShippingScreen from "./components/ShippingScreen";
import PaymentScreen from "./components/PaymentScreen";
import PlaceOrderScreen from "./components/PlaceOrderScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" exact component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
