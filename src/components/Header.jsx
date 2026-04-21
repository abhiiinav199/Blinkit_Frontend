import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import Search from "./Search"
import { FaRegCircleUser } from 'react-icons/fa6'
import { BsCart4 } from 'react-icons/bs'
import { useMobile } from "../hooks/useMobile"
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState } from "react"
import UsersMenu from "./UsersMenu"


const Header = () => {
  const [ismobile] = useMobile()
  const location = useLocation()
  const navigate = useNavigate()
  const isSearchPage = location.pathname === '/search'
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setopenUserMenu] = useState(false)
 

  // console.log("user from redux stores file Header.jsx", user)  
  const redirecttoLoginPage = () => {
    navigate("/login")
  }
  const handleCloseUserMenu = () => {
    setopenUserMenu(false)
  }
  const handleMobileUser = () => {
    if(!user._id){
      navigate("/login")
      return 
    }
    navigate("/user")
  }

  return (
    <header className="h-24 lg:h-20 shadow-md sticky top-0 z-40 flex items-center flex-col">

      {
        !(isSearchPage && ismobile) && (

          <div className="container mx-auto lg:h-full flex items-center justify-between px-2 gap-1">

            {/* Logo */}
            <div className="h-full py-1 "> 
              <Link to={"/"} className=" h-full flex justify-center items-center">
                <img src={logo} width={170} height={60} alt="logo" className="hidden lg:block" />
                <img src={logo} width={120} height={60} alt="logo" className="lg:hidden" />
              </Link>
            </div>

            {/* Search */}
            <div className="hidden lg:block">
              <Search />
            </div>

            {/* login and my cart */}
            <div>
              {/* user icons display only in mobile version */}
              <button  onClick={handleMobileUser} className="text-neutral-500 lg:hidden"> 
                <FaRegCircleUser />
              </button>

              {/* Desktop */}
              <div className="hidden lg:flex items-center gap-10">

                {
                  user?._id ? (
                    <div className="relative">
                      <div className="flex items-center gap-1 cursor-pointer select-none"  onClick={() => setopenUserMenu(prev => !prev)}>
                      
                        <FaRegCircleUser />
                        <p>Account</p>

                        {
                          openUserMenu ? (
                            <GoTriangleUp size={25} />
                          ) : (
                            <GoTriangleDown size={25} />
                          )
                        }


                      </div>

                      {
                        openUserMenu && (
                          <div className="absolute right-0 top-12 ">
                            <div className="bg-white rounded shadow-md p-4 min-w-52 lg:shadow-lg">
                              <UsersMenu close={handleCloseUserMenu} />
                            </div>
                          </div>
                        )
                      }

                    </div>
                  ) : (
                    <button className="cursor-pointer text-lg px-2" onClick={redirecttoLoginPage}>Login</button>

                  )
                }
                <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 cursor-pointer rounded text-white">

                  {/* Add to cart icon */}
                  <div className="animate-bounce">
                    <BsCart4 size={26} />
                  </div>

                  <div className="font=semibold">
                    <p>My cart</p>
                  </div>
                </button>
              </div>

            </div>


          </div>


        )
      }


      <div className="container mx-auto mt-5 lg:mt-0 md:mt-0 px-2 lg:hidden">
        <Search />
      </div>

    </header>



  )
}

export default Header