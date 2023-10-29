import { SnackbarProvider } from "notistack";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import Home from "./modules/home";
import InvoiceApp from "./modules/invoice";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "invoice",
    Component: InvoiceApp,
  },
]);

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
};

export default App;
