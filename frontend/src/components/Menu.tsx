import React from "react";

interface Props {
  cat: string;
  setCat: React.Dispatch<any>;
}

const Menu: React.FC<Props> = ({ cat, setCat }) => {
  return (
    <div className="flex flex-col flex-1 justify-between text-[12px] text-[#555] p-[10px] border-[1px] border-solid border-gray-300">
      <h1 className="text-[20px]">Category</h1>

      <div className="flex items-center gap-[2px] text-red-400">
        <input
          type="radio"
          name="cat"
          value="all"
          id="all"
          checked={cat === "all"}
          onChange={(e) => setCat(e.target.value)}
        />
        <label className="underline cursor-pointer" htmlFor="all">
          All
        </label>
      </div>
      <div className="flex items-center gap-[2px] text-red-400">
        <input
          type="radio"
          name="cat"
          value="art&design"
          id="art&design"
          checked={cat === "art&design"}
          onChange={(e) => setCat(e.target.value)}
        />
        <label className="underline cursor-pointer" htmlFor="art&design">
          Art&Design
        </label>
      </div>
      <div className="flex items-center gap-[2px] text-red-400">
        <input
          type="radio"
          name="cat"
          value="technology"
          id="technology"
          checked={cat === "technology"}
          onChange={(e) => setCat(e.target.value)}
        />
        <label className="underline cursor-pointer" htmlFor="technology">
          Technology
        </label>
      </div>
      <div className="flex items-center gap-[2px] text-red-400">
        <input
          type="radio"
          name="cat"
          value="books"
          id="books"
          checked={cat === "books"}
          onChange={(e) => setCat(e.target.value)}
        />
        <label className="underline cursor-pointer" htmlFor="books">
          Books
        </label>
      </div>
      <div className="flex items-center gap-[2px] text-red-400">
        <input
          type="radio"
          name="cat"
          value="food"
          id="food"
          checked={cat === "food"}
          onChange={(e) => setCat(e.target.value)}
        />
        <label className="underline cursor-pointer" htmlFor="food">
          Food
        </label>
      </div>
      <div className="flex items-center gap-[2px] text-red-400">
        <input
          type="radio"
          name="cat"
          value="health"
          id="health"
          checked={cat === "health"}
          onChange={(e) => setCat(e.target.value)}
        />
        <label className="underline cursor-pointer" htmlFor="health">
          Health
        </label>
      </div>
    </div>
  );
};

export default Menu;
