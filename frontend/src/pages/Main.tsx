import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainImg from "../images/main.svg";
import { cats } from "../constants/cats";

const Main: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-72px)]">
      <div className="flex flex-col md:flex-row sm:mx-36 2xl:mx-72">
        <div className="flex flex-col items-center justify-between w-full md:w-1/2 text-left">
          <h1 className="font-bold text-lightRed md:text-4xl text-3xl 2xl:text-6xl leading-8">
            A place where you can post your blogs with ease and comfort.
          </h1>
          <p className="text-gray-400 self-start md:text-xl text-lg 2xl:text-xl leading-8">
            You can easily create a beautiful and unique blog.
          </p>
          <button className="inline-flex self-start items-center  bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
            <Link className="py-2 px-4" to={`/posts/?cat=${cats.ALL}`}>
              See Posts
            </Link>
          </button>
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2">
          <motion.img
            transition={{ ease: "linear", duration: 3, repeat: Infinity }}
            animate={{ y: [20, -20, 20] }}
            src={MainImg}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
