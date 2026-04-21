import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useMobile } from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [ismobile] = useMobile()

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
 

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border border-transparent overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">

      <div>

        { 
          (ismobile && isSearchPage) ? (
            <Link to={"/"}  className="flex p-2 m-1 justify-center items-center h-full group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
              <FaArrowLeft size={20} />
            </Link>

          ) : (
            <button className="flex p-3 justify-center items-center h-full group-focus-within:text-primary-200">
              <IoSearch size={22} />
            </button>

          )
        }


      </div>

      <div className="w-full h-full">
        {!isSearchPage ? (
          // Not in search page
          <div onClick={redirectToSearchPage} className="w-full h-full flex items-center text-neutral-500 bg-slate-50  ">
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "paneer"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // Search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta, dal and more..."
              autoFocus
              className="bg-transparent w-full outline-none h-full"
            />
          </div> 
        )}
      </div>
    </div>
  );
};

export default Search;
