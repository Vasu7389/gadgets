import React from "react";
import GooglePayButton from "@google-pay/button-react";
import { connect } from "react-redux";
import { payOrder } from "../../actions/orderActions";

function GPayButton(props) {
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US",
    },
  };

  return (
    <GooglePayButton
      environment="TEST"
      buttonColor="default"
      buttonType="buy"
      buttonSizeMode="static"
      paymentRequest={paymentRequest}
      onLoadPaymentData={(paymentResult) => {
        props.payOrder(props.orderId, paymentResult);
      }}
    />
  );
}

export default connect(null, { payOrder })(GPayButton);
