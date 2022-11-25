import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainImg from "../images/main.svg";
import { cats } from "../constants/cats";
// import reactImg from "../images/react.svg";
// import {
//   createPost,
//   updatePost,
//   getPosts, // All API REQ Works, Figure out how to get the postid of a post.
//   getPost,
//   deletePost,
// } from "../api/Api";

const Main: React.FC = () => {
  const createPostHandler = async () => {
    // const res = await createPost({
    //   title: "hello",
    //   desc: "whats up?",
    //   img: reactImg,
    //   cat: "technology",
    // });
    // const res = await updatePost("63695a402546db6c4271db1f", {
    //   // real question is how the fuck do we get the id of the post we want to update
    //   title: "hey",
    //   desc: "nigga",
    // });
    // const res = await getPosts(cats.ALL);
    // const res = await getPost("63695a402546db6c4271db1f");
    // const res = await deletePost("63695a402546db6c4271db1f");
    // console.log(res);
  };

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

          <button
            onClick={createPostHandler}
            className="inline-flex self-start items-center  bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
          >
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
