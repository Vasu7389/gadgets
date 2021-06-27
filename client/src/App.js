import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./bootstrap.min.css";
import { Container } from "react-bootstrap";
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
import OrderScreen from "./components/OrderScreen";
import UserListScreen from "./components/UserListScreen";
import UserEditScreen from "./components/UserEditScreen";
import ProductListScreen from "./components/ProductListScreen";
import ProductEditScreen from "./components/ProductEditScreen";
import OrderListScreen from "./components/OrderListScreen";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="py-3">
        <Container>
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/" exact component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
