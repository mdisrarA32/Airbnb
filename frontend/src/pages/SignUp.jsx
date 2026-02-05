import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { toast } from "react-toastify";

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { serverUrl, loading, setLoading } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUP = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      let result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      toast.success("Signup Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex">
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <form
          onSubmit={handleSignUP}
          className="w-[80%] max-w-md flex flex-col gap-4"
        >
          <h1 className="text-3xl font-semibold">Create account</h1>

          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="border rounded-lg p-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {show ? (
              <IoMdEyeOff
                className="absolute right-3 top-4 cursor-pointer"
                onClick={() => setShow(false)}
              />
            ) : (
              <IoMdEye
                className="absolute right-3 top-4 cursor-pointer"
                onClick={() => setShow(true)}
              />
            )}
          </div>

          <button
            className="bg-black text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="font-semibold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>

      {/* RIGHT PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-black to-gray-800 text-white p-16 flex-col justify-center gap-6">
        <div className="bg-white/10 p-4 rounded-xl">🚀 Welcome to Airbnb</div>
        <div className="bg-white/10 p-4 rounded-xl">
          Secure authentication system
        </div>
        <div className="bg-white/10 p-4 rounded-xl">
          MERN stack application
        </div>
      </div>
    </div>
  );
}

export default SignUp;
