import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../dto/create-user.dto";
import { API_ENDPOINTS } from "../api/Api";

const Register: React.FC = () => {
  const [err, setError] = useState<boolean | null>(null);
  const [inputs, setInputs] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post(API_ENDPOINTS.REGISTER, inputs);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lightRed">
      <h1 className="text-xl text-white mb-5">Register</h1>
      <form className="flex flex-col p-[50px] bg-white w-[90%] md:w-1/3 gap-5">
        <input
          className="p-3 border-b-[1px] border-solid border-gray-400"
          required
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          className="p-3 border-b-[1px] border-solid border-gray-400"
          required
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          className="p-3 border-b-[1px] border-solid border-gray-400"
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="p-2.5 border-none bg-red-400 cursor-pointer text-white rounded-sm hover:bg-lightRed"
        >
          Register
        </button>
        {err && <p className="text-sm text-red-500 text-center">{err}</p>}
        <span className="text-sm text-center">
          Do you have an account?{" "}
          <span className="text-red-700">
            <Link to="/login">Login</Link>
          </span>
        </span>
      </form>
    </div>
  );
};

export default Register;
