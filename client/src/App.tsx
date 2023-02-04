import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { checkAuth } from "./redux/actions";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import ToastComponent from "./components/ToastComponent";

function App(): JSX.Element {
  const dispatch: AppDispatch = useAppDispatch();

  const [authStatus, authMessage]: [boolean, string] = useAppSelector((state: RootState) => [
    state?.appState?.authStatus?.auth,
    state?.appState?.authStatus?.message,
  ]);
  // console.log("authMessage;", authMessage);

  const [message, setMessage] = React.useState<string>("");
  // console.log({ message });

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  React.useEffect(() => {
    if (authMessage) {
      setMessage(authMessage);
    }
  }, [authMessage, message]);

  return (
    <React.Fragment>
      <Router>
        <Header />
        {message && <ToastComponent message={message} />}
        <Routes>
          <Route
            path="/"
            element={authStatus ? <Navigate replace={true} to="/dashboard" /> : <Navigate replace={true} to="/login" />}
          />
          <Route path="/login" element={authStatus ? <Navigate replace={true} to="/dashboard" /> : <Login />} />
          <Route path="/register" element={authStatus ? <Navigate replace={true} to="/dashboard" /> : <Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
