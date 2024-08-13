import { SnackbarProvider } from "notistack";
import { HashRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./modules/home";
import InvoiceApp from "./modules/invoice";
import Login from "./modules/login";
import { getAuth, verifyAuth } from "./services/auth";
import { useEffect, useState } from "react";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { theme } from "./config/theme";
import Dashoboard from "./modules/dashboard";

const PrivateRoutes = () => {
  let token = getAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [init, setInit] = useState();
  useEffect(() => {
    const verify = async () => {
      await verifyAuth();
      setInit(true);
    };
    verify();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        {init ? (
          <HashRouter>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/invoice" element={<InvoiceApp />} />
                <Route path="/dashboard" element={<Dashoboard />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </HashRouter>
        ) : (
          <CircularProgress />
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
