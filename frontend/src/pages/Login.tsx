import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

interface User {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<User>({
    username: "",
    password: "",
  });
  const [err, setError] = useState<boolean | null>(null);

  const { login } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lightRed">
      <h1 className="text-xl text-white mb-5">Login</h1>
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
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="p-2.5 border-none bg-red-400 cursor-pointer text-white rounded-sm hover:bg-lightRed"
        >
          Login
        </button>
        {err && <p className="text-sm text-red-500 text-center">{err}</p>}
        <span className="ext-sm text-center">
          Don't you have an account?{" "}
          <span className="text-red-700">
            <Link to="/register">Register</Link>
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
