import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import Message from "./common/Message";
import Loader from "./common/Loader";
import { listProducts } from "../actions/productActions";
import { connect } from "react-redux";

const HomeScreen = (props) => {
  useEffect(() => {
    props.listProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {props.loading ? (
        <Loader />
      ) : props.error ? (
        <Message variant="danger">{props.error}</Message>
      ) : (
        <Row>
          {props.products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productList.products,
    loading: state.productList.loading,
    error: state.productList.error,
  };
};

export default connect(mapStateToProps, { listProducts: listProducts })(
  HomeScreen
);
