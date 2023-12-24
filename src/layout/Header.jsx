import logo from "../assets/movix-logo.svg"
import { HiOutlineSearch } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Header() {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false)
  const navigate = useNavigate()

  const navigateHandle = (type) =>{
    navigate(`/explore/${type}`)
  }



  return (
    <>
      <div className="flex justify-center w-full">
        <div className="px-10 flex justify-between items-center h-[60px] fixed z-10 bg-opacity-35 backdrop-blur-[8px] text-white w-full">
          <div>
            <img className="h-[50px] hover:cursor-pointer" onClick={() => navigate("/")} src={logo} alt="" />
          </div>
          <div>
            <ul className="flex gap-5 text-[20px]">
              <li className="hover:text-[#DF4156] hover:cursor-pointer duration-200" onClick={() => navigateHandle("movie")}>Movies</li>
              <li className="hover:text-[#DF4156] hover:cursor-pointer duration-200" onClick={() => navigateHandle("tv")}>Tv shows</li>
              <li><HiOutlineSearch className="hover:text-[#DF4156] hover:cursor-pointer duration-200" onClick={() => setIsSearchBoxOpen(true)} /></li>
            </ul>
          </div>
        </div>
      </div>

      {
        isSearchBoxOpen &&
        <div className='absolute w-full top=[60px] mt-[60px] z-10 rounded-full flex justify-center'>
          <input type="text" className='w-[80%] h-[40px]  text-[14px] indent-5 rounded-s-full' />
          <RiCloseFill className="text-[40px] bg-white rounded-e-full" onClick={() => setIsSearchBoxOpen(false)}/>
        </div>
      }
    </>
  )
}

export default Header