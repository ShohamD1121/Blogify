import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Parser from "html-react-parser";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Post as PostType } from "../dto/create-post.dto";
import { AuthContext } from "../context/authContext";
import { getPost, deletePost, getUsers } from "../api/Api";
import { User } from "../dto/create-user.dto";
import Loader from "../components/Loader";

const Post: React.FC = () => {
  const [post, setPost] = useState<PostType>({
    title: "",
    desc: "",
    img: "",
    cat: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { config, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const postResponse = await getPost(postId);
        const usersResponse = await getUsers();
        setIsLoading(false);
        setUsers(usersResponse.data.usersData);
        setPost(postResponse.data.existingPost);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await deletePost(postId, config);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const findPostUser = (post: PostType) => {
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
      <div className="flex p-16 min-w-[75%]">
        {isLoading ? <Loader /> : null}
        {!isLoading ? (
          <div className="flex">
            <div className="flex flex-col w-1/2 justify-between">
              <div className="flex flex-col gap-3">
                <h1 className="text-[48px]">{post.title}</h1>
                <p className="text-[12px] text-gray-400">
                  Posted at {post.createdAt} by {findPostUser(post)}
                </p>
                <div className="text-[14px]">{Parser(post.desc)}</div>
              </div>
              {user === findPostUser(post) && (
                <div className="flex gap-2">
                  <Link to={`/posts/write?edit=2`} state={post}>
                    <img
                      className="w-[30px] h-[30px] cursor-pointer;"
                      src={Edit}
                      alt="img"
                    />
                  </Link>
                  <img
                    onClick={handleDelete}
                    className="w-[30px] h-[30px] cursor-pointer;"
                    src={Delete}
                    alt="img"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center items-center w-1/2 ">
              <img
                className="w-3/4 h-3/4 object-contain"
                src={`../../uploads/${post.img}`}
                alt="img"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
