import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { cats } from "../constants/cats";
import { AuthContext } from "../context/authContext";

const Navbar: React.FC = () => {
  const [navbar, setNavbar] = useState(false);
  const { user, currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="w-full bg-red-50 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <h2 className="text-2xl font-bold text-lightRed">Blogify</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-lightRed"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-lightRed"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-2 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            {currentUser && user !== "" ? (
              <h1 className="md:hidden text-lightRed w-auto text-center mb-5">
                Hello {user}
              </h1>
            ) : null}
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 font-light text-red-600">
              <li className="hover:text-red-300">
                <Link to={`/posts/?cat=${cats.ARTandDESIGN}`}>ART&DESIGN</Link>
              </li>
              <li className="hover:text-red-300">
                <Link to={`/posts/?cat=${cats.TECHNOLOGY}`}>TECHNOLOGY</Link>
              </li>
              <li className="hover:text-red-300">
                <Link to={`/posts/?cat=${cats.BOOKS}`}>BOOKS</Link>
              </li>
              <li className="hover:text-red-300">
                <Link to={`/posts/?cat=${cats.FOOD}`}>FOOD</Link>
              </li>
              <li className="hover:text-red-300">
                <Link to={`/posts/?cat=${cats.HEALTH}`}>HEALTH</Link>
              </li>
            </ul>
            <div className="mt-3 space-y-2 md:hidden ">
              <div className="flex flex-col gap-2">
                {currentUser ? (
                  <div className="flex flex-col gap-2">
                    <button
                      className="w-full px-3 py-1 text-center text-lightRed bg-red-100 rounded-md shadow hover:bg-red-50 cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </button>
                    <Link
                      to="/posts/write"
                      className="inline-block w-full px-4 py-2 text-center text-white bg-red-500 rounded-md shadow hover:bg-red-50 hover:text-lightRed"
                    >
                      Write
                    </Link>
                  </div>
                ) : (
                  <Link
                    className="text-center px-3 py-1 text-white bg-red-500 rounded-md shadow hover:bg-red-50 hover:text-lightRed"
                    to="/login"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          <div className="flex gap-2">
            {currentUser ? (
              <div className="flex flex-col">
                {user !== "" ? (
                  <h1 className="text-lightRed w-auto text-center">
                    Hello {user}
                  </h1>
                ) : null}
                <div className="flex gap-2 mt-2">
                  <Link
                    to="/posts/write"
                    className="px-3 py-1 text-white bg-red-500 rounded-md shadow hover:bg-red-50 hover:text-lightRed"
                  >
                    Write
                  </Link>
                  <button
                    className="w-auto px-3 py-1 text-center text-lightRed bg-red-100 rounded-md shadow hover:bg-red-50 cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                className="px-3 py-1 text-white bg-red-500 rounded-md shadow hover:bg-red-50 hover:text-lightRed"
                to="/login"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
