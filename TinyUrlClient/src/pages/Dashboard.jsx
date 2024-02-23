import { useEffect, useState } from "react";
import SortableTable from "../components/sortabletable";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_URL } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Dashboard = () => {
  const [links, setLinks]= useState([]);
  const [isLoggedIn, setIsLoggedIn]= useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = jwtDecode(token).id;

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`${API_URL}/urls/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLinks(response?.data)
      setIsLoggedIn(true)
    } catch (error) {
      toast("An Error Ocurred", {
        position: "top-right",
        hideProgressBar: false,
        type: "error",
        closeOnClick: true,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false)
      navigate("/login");
    }else{
      fetchLinks();
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn}/>
      <ToastContainer />
      <SortableTable TABLE_ROWS={links}/>
      <Footer/>
    </>
  );
};

export default Dashboard;
