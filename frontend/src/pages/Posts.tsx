import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPosts, getUsers } from "../api/Api";
import { Post } from "../dto/create-post.dto";
import Loader from "../components/Loader";
import Parser from "html-react-parser";
import { User } from "../dto/create-user.dto";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cat = useLocation().search.split("=")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const usersResponse = await getUsers();
        const postsResponse = await getPosts(cat);
        setIsLoading(false);
        setError(false);
        setUsers(usersResponse.data.usersData);
        setPosts(postsResponse.data.postData);
      } catch (err: any) {
        setIsLoading(false);
        setError(true);
        console.log(err.response.data.message);
      }
    };
    fetchData();
  }, [cat]);

  const findPostUser = (post: Post) => {
    var username;
    users.forEach((user: any) => {
      if (post.uid === user._id) {
        username = user.username;
        return null;
      }
    });
    return username;
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-72px-76px)]">
      <div className="flex flex-col w-full">
        {isLoading ? <Loader /> : null}
        {!error && !isLoading
          ? posts.map((post) => {
              return (
                <div
                  className="flex gap-10 mb-10 flex-col-reverse min-h-[calc(100vh-72px)] odd:md:flex-row-reverse even:md:flex-row p-16"
                  key={post._id}
                >
                  <div className="flex flex-[2] items-center justify-center">
                    <img
                      className="w-3/4 h-3/4 object-cover"
                      src={`../uploads/${post.img}`}
                      alt="img"
                    />
                  </div>
                  <div className="flex-[3] flex flex-col justify-between">
                    <Link to={`/posts/${post._id}`}>
                      <h1 className="text-[48px]">{post.title}</h1>
                    </Link>
                    <h3 className="text-[12px] text-gray-400">
                      Posted at {post.createdAt} by {findPostUser(post)}
                    </h3>
                    <div className="text-[14px]">{Parser(post.desc)}</div>
                    <button className="w-max py-2.5 px-5 cursor-pointer rounded bg-white text-red-400 border-[1px] border-solid border-red-400 hover:border-white hover:bg-lightRed hover:text-white">
                      Read More
                    </button>
                  </div>
                </div>
              );
            })
          : null}
        {!isLoading && error ? (
          <h1 className="text-center text-xl md:text-5xl text-lightRed">
            There was no posts in this category
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default Posts;
