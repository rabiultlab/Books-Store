import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === false) {
    links.splice(2, 2);
  }

  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="relative z-50 flex items-center justify-between bg-zinc-800 text-white py-4 px-8">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="Logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <>
                {items.title === "profile" ? (
                  <Link
                    to={items.link}
                    className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="hover:text-blue-500 transition-all duration-300"
                    key={i}
                  >
                    {items.title}{" "}
                  </Link>
                )}
              </>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/LogIn"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500  rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} text-white absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center bg-zinc-800 h-screen`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`${MobileNav}text-white text-4xl mt-8 font-semibold hover:text-blue-500 transition-all duration-300`}
            key={i}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}{" "}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to="/LogIn"
              className={`${MobileNav} px-8 py-2 mt-5  text-3xl font-semibold mb-8 border border-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className={`${MobileNav} px-8 py-2 text-3xl font-semibold  mb-8 bg-blue-500  rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
