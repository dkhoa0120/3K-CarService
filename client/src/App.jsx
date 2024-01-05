import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./assets/PrivateRoute.jsx";
import Listing from "./pages/Listing.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import ListingDetail from "./pages/ListingDetail.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
        <Route element={<PrivateRoute />}>
          <Route element={<Profile />} path="/profile" />
          <Route element={<Listing />} path="/list" />
          <Route element={<CreateListing />} path="/create-list" />
          <Route element={<UpdateListing />} path="/update-list/:id" />
        </Route>
        <Route element={<ListingDetail />} path="/list-detail/:id" />
      </Routes>
    </>
  );
}

export default App;
