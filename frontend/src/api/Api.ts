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

const createConfig = (config: string) => {
  const configObj = {
    headers: {
      Authorization: "Bearer " + config,
    },
  };

  return configObj;
};

export const signUp = async (inputs: signUpUser, conf: string) => {
  const config = createConfig(conf);
  const res = await axios.post(API_ENDPOINTS.REGISTER, inputs, config);
  return res;
};

export const signIn = async (inputs: signInUser, conf: string) => {
  const config = createConfig(conf);
  const res = await axios.post(API_ENDPOINTS.LOGIN, inputs, config);
  return res;
};

export const createPost = async (post: Post, conf: string) => {
  const config = createConfig(conf);
  const res = await axios.post(API_ENDPOINTS.POST, post, config);
  return res;
};

export const updatePost = async (
  postId: string,
  post: object,
  conf: string
) => {
  const config = createConfig(conf);
  const res = await axios.put(`${API_ENDPOINTS.POST}/${postId}`, post, config);
  return res;
};

export const getPosts = (cat?: string) => {
  const res = axios.get(`${API_ENDPOINTS.POST}/${cat}`);
  return res;
};

export const getPost = async (postId: string) => {
  const res = await axios.get(`${API_ENDPOINTS.POST}/post/${postId}`);
  return res;
};

export const deletePost = async (postId: string, conf: string) => {
  const config = createConfig(conf);
  const res = await axios.delete(`${API_ENDPOINTS.POST}/${postId}`, config);
  return res;
};

export const upload = async (file: File, conf: string) => {
  const config = createConfig(conf);
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
  const res = await axios.get(`${API_URL}/users`);
  return res;
};
