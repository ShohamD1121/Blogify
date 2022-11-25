import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-red-50 py-2 w-full flex flex-col justify-center items-center">
      <h1 className="text-xl text-lightRed font-semibold mb-2">Blogify</h1>
      <span>
        Made By Shoham Douek With{" "}
        <b className="text-lightRed">ReactJS, NestJS and MongoDB</b>
      </span>
    </footer>
  );
};

export default Footer;
