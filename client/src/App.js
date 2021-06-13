import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./bootstrap.min.css";
import { Container } from "react-bootstrap";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomeScreen from "./components/HomeScreen";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" exact component={ProductDetail} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
