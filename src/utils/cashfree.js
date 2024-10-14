import { load } from "@cashfreepayments/cashfree-js";
import { Constant } from "./constants";

export async function checkout(paymentSessionId, returnUrl, setLoading) {
  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: Constant.ENV == "prod" ? "production" : "sandbox",
    });
  };
  await initializeSDK();

  let checkoutOptions = {
    paymentSessionId,
    redirectTarget: "_modal",
  };

  // setLoading(false);
  cashfree.checkout(checkoutOptions).then((result) => {
    if (result.error) {
      // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
      console.log(
        "User has closed the popup or there is some payment error, Check for Payment Status"
      );
      console.log(result.error);
    }
    if (result.redirect) {
      // This will be true when the payment redirection page couldnt be opened in the same window
      // This is an exceptional case only when the page is opened inside an inAppBrowser
      // In this case the customer will be redirected to return url once payment is completed
      console.log("Payment will be redirected");
    }
    if (result.paymentDetails) {
      // setLoading(true);
      // This will be called whenever the payment is completed irrespective of transaction status
      console.log("Payment has been completed, Check for Payment Status");
      console.log(result.paymentDetails.paymentMessage);
      window.location.href = returnUrl;
    }
  });
}
