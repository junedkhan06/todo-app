import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Header from "../pages/header";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Register from "../pages/register";
import { Toaster } from "react-hot-toast";
import { useEffect, useContext } from "react";
import axios from "axios";
import { server } from "./main";
import { Context } from "./main";

function App() {

  const {setUser, setIsAuthenticated, setLoading} = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios 
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
