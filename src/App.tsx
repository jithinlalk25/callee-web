import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Form from "./routes/Form";
import PaymentStatus from "./routes/PaymentStatus";

const router = createBrowserRouter([
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
