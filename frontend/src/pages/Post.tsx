import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Post as PostType } from "../dto/create-post.dto";
import { AuthContext } from "../context/authContext";
import { getPost, deletePost, getUsers } from "../api/Api";
import { User } from "../dto/create-user.dto";

const Post: React.FC = () => {
  const [post, setPost] = useState<PostType>({
    title: "",
    desc: "",
    img: "",
    cat: "",
    createdAt: "",
    _id: "",
    uid: "",
  });
  const { currentUser, config } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPost(postId);
        const usersResponse = await getUsers();
        setUsers(usersResponse.data.usersData);
        setPost(res.data.existingPost);
        // console.log(post, res.data.existingPost);
      } catch (error) {
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
    console.log(post);

    users.forEach((user: any) => {
      if (post.uid === user._id) {
        username = user.username;
        return null;
      }
    });
    return username;
  };

  return (
    <div className="single">
      <div className="single_content">
        <img
          className="single_content_img"
          src={`../uploads/${post.img}`}
          alt="img-img"
        />
        <div className="single_user">
          {post.img && (
            <img
              className="single_user_img"
              src={`../uploads/${post.img}`}
              alt="img"
            />
          )}
          <div className="single_user_info">
            <span className="single_user_name">{findPostUser(post)}</span>
            <p className="single_user_created_at">Posted {post.createdAt}</p>
          </div>
          {currentUser?.username === findPostUser(post) && (
            <div className="single_user_edit">
              <Link to={`/posts/write?edit=2`} state={post}>
                <img className="single_user_edit_img" src={Edit} alt="img" />
              </Link>
              <img
                onClick={handleDelete}
                className="single_user_edit_img"
                src={Delete}
                alt="img"
              />
            </div>
          )}
        </div>
        <h1 className="single_content_title">{post.title}</h1>
        <p className="single_content_desc">{post.desc}</p>
      </div>
    </div>
  );
};

export default Post;
