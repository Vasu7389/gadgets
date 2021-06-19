import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import FormContainer from "./common/FormContainer";
import CheckoutSteps from "./CheckoutSteps";

const PaymentScreen = ({ history, savePaymentMethod, shippingAddress }) => {
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const onSubmitForm = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod); //es6+
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitForm}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col className="py-3">
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              check
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    shippingAddress: state.cart.shippingAddress,
  };
};

export default connect(mapStateToProps, {
  savePaymentMethod: savePaymentMethod,
})(PaymentScreen);
