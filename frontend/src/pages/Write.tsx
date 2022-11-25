import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { updatePost, createPost, upload } from "../api/Api";
import Menu from "../components/Menu";
import "react-quill/dist/quill.snow.css";

const Write: React.FC = () => {
  const state = useLocation().state;
  const [value, setValue] = useState<string>(state?.desc || "");
  const [title, setTitle] = useState<string>(state?.title || "");
  const [file, setFile] = useState<any>(null);
  const [cat, setCat] = useState<string>(state?.cat || "");
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const imgUrl = await upload(file);

    try {
      state
        ? await updatePost(state.id, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await createPost({
            title,
            desc: value,
            img: file ? imgUrl : "",
            cat,
          });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-[20px] p-5 min-h-[calc(100vh-72px-76px)]">
      <div className="flex w-full gap-5">
        <div className="flex-[5] flex flex-col gap-[20px]">
          <input
            className=" p-[10px] border-[1px] border-solid border-gray-300"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="h-[300px] 2xl:h-[600px] overflow-scroll border-[1px] border-solid border-gray-300">
            <ReactQuill
              className="h-full border-none"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="flex-[2] flex flex-col gap-[20px]">
          <div className="flex flex-col flex-1 justify-between text-[12px] text-[#555] p-[10px] border-[1px] border-solid border-gray-300">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={handleFileChange}
            />
            <label className="underline cursor-pointer" htmlFor="file">
              Upload Image
            </label>
            <div className="flex justify-between">
              <button className="cursor-pointer text-red-400 bg-white border-[1px] border-solid border-red-400 py-[3px] px-[5px]">
                Save as a draft
              </button>
              <button
                onClick={handleClick}
                className="cursor-pointer text-white  bg-red-400 border-[1px] border-solid border-red-400 py-[3px] px-[5px]"
              >
                Publish
              </button>
            </div>
          </div>
          <Menu cat={cat} setCat={setCat} />
        </div>
      </div>
    </div>
  );
};

export default Write;
