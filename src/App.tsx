import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Form from "./routes/Form";
import CallToActionWithAnnotation from "./routes/Home";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import TermsAndConditions from "./routes/TermsAndConditions";
import ContactUs from "./routes/ContactUs";
import PaymentStatus from "./routes/PaymentStatus";
import CancellationRefundPolicy from "./routes/CancellationRefundPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CallToActionWithAnnotation />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/cancellation-refund-policy",
    element: <CancellationRefundPolicy />,
  },
  {
    path: "/payment-status/:orderId",
    element: <PaymentStatus />,
  },
  {
    path: "/:id",
    element: <Form />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
