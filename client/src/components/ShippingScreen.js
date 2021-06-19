import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import FormContainer from "./common/FormContainer";
import CheckoutSteps from "./CheckoutSteps";

const ShippingScreen = ({
  history,
  saveShippingAddress,
  //if shipping address is not coming from localstorage, so giving default values ->
  //[old code] - shippingAddress = { address: "", city: "", postalCode: "", country: "" }
  //BUT AFTER DEBUGGING, found out that default prop value only works if prop is not even passed and
  //it only do shallow merge so if is sees shippingAddress passed, it will not create address..etc properties
  shippingAddress,
}) => {
  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );

  const onSubmitForm = (e) => {
    e.preventDefault();
    saveShippingAddress({
      address,
      city,
      postalCode,
      country,
    }); //es6+
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={onSubmitForm}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></Form.Control>
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
  saveShippingAddress: saveShippingAddress,
})(ShippingScreen);
