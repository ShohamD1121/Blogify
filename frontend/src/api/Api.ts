import axios from "axios";
import { Post } from "../dto/create-post.dto";
import { User as signUpUser } from "../dto/create-user.dto";

interface signInUser {
  username: string;
  password: string;
}

export const API_URL = "http://localhost:5000";
export const API_ENDPOINTS = {
  REGISTER: `${API_URL}/users/signup`,
  LOGIN: `${API_URL}/auth/login`,
  POST: `${API_URL}/posts`,
};

const config = {
  headers: {
    Authorization:
      "Bearer " +
      JSON.parse(localStorage.getItem("user") as string)?.access_token,
  },
};

export const signUp = async (inputs: signUpUser) => {
  const res = await axios.post(API_ENDPOINTS.REGISTER, inputs, config);
  return res;
};

export const signIn = async (inputs: signInUser) => {
  const res = await axios.post(API_ENDPOINTS.LOGIN, inputs, config);
  return res;
};

export const createPost = async (post: Post) => {
  console.log(post);

  const res = await axios.post(API_ENDPOINTS.POST, post, config);
  return res;
};

export const updatePost = async (postId: string, post: object) => {
  const res = await axios.put(`${API_ENDPOINTS.POST}/${postId}`, post, config);
  return res;
};

export const getPosts = (cat?: string) => {
  const res = axios.get(`${API_ENDPOINTS.POST}/${cat}`, config);
  return res;
};

export const getPost = async (postId: string) => {
  const res = await axios.get(`${API_ENDPOINTS.POST}/${postId}`, config);
  return res;
};

export const deletePost = async (postId: string) => {
  const res = await axios.delete(`${API_ENDPOINTS.POST}/${postId}`, config);
  return res;
};

export const upload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(
      `${API_ENDPOINTS.POST}/upload`,
      formData,
      config
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`, config);
  return res;
};
