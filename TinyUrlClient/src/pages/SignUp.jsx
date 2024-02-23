import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import Footer from "../components/footer";

const Signup = () => {
  //form inputs states
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //check if all fields are provided
    if (!username || !password || !email || !confirmPassword) {
      toast("Provide all fields", {
        position: "top-right",
        hideProgressBar: false,
        type: "error",
        closeOnClick: true,
      });
      return;
    } else if (password !== confirmPassword) {
      toast("Passwords don't match", {
        position: "top-right",
        hideProgressBar: false,
        type: "error",
        closeOnClick: true,
      });
      return;
    } else {
      setLoading(true);
      try {
        const response = await axios.post(API_URL + "/api/auth/signup", {
          username,
          email,
          password,
        });
        console.log(response?.data);
        if (response?.data?.status === "CREATED") {
          toast("Successfully created your account", {
            position: "top-right",
            hideProgressBar: false,
            type: "success",
            closeOnClick: true,
          });
          //clear form inputs
          setEmail("");
          setPassword("");
          setUserName("");
          setConfirmPassword("");

          setLoading(false);
          //redirect to login
          navigate("/login");
        } else {
          toast(response?.data?.message, {
            position: "top-right",
            hideProgressBar: false,
            type: "error",
            closeOnClick: true,
          });
        }
      } catch (error) {
        console.log("catch error", error);
        setLoading(false);
        toast(error?.response?.data?.message || "An error occured", {
          position: "top-right",
          hideProgressBar: false,
          type: "error",
          closeOnClick: true,
        });
      }
    }
  };

  return (
    <div className="pb-12">
      <ToastContainer />
      <div className="flex flex-col items-center mt-8 border rounded-md shadow-lg w-full md:w-[35vw] mx-auto py-6 px-4 md:px-16">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[60%]" />
        </Link>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <input
              type="text"
              id="fullname"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-black text-sm"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full mb-6 flex justify-center mx-auto text-sm px-4 py-3 text-white bg-[#12A3ED] rounded-xl hover:bg-[#12a4ed9b]"
            style={{ backgroundColor: "#12A3ED" }}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Signup"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a className="text-[#12A3ED] font-bold" href="/login">
            Sign in
          </a>
          .
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
