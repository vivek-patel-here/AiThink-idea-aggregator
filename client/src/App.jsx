import "./App.css";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalContext from "./GlobalContext.jsx";
import Home from "./Pages/Home/Home.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import PageNotFound from "./Pages/PageNotFound/PageNotFound.jsx";
import Demo from "./Pages/Demo/Demo.jsx";
import About from "./Pages/About/About.jsx";
import Idea from "./Pages/Idea/Idea.jsx";
import {
  ProtectedRoute,
  PublicRoute,
} from "./components/RouteGuard/RouteGuard.jsx";
function App() {
  const { isAuth } = useContext(GlobalContext);
  return (
    <div className={isAuth ? "app-login" : "app"}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuth === true ? "/home" : "/auth"} />}
        />

        <Route
          path="/auth"
          element={
            <PublicRoute isAuth={isAuth}>
              <Auth />
            </PublicRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/demo"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Demo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/idea"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Idea />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
