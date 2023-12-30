import logo from "../assets/movix-logo.svg"
import { HiOutlineSearch } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Header() {
  const [searchData, setSearchData] = useState("")
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false)
  const navigate = useNavigate()

  const navigateHandle = (type) => {
    navigate(`/explore/${type}`)
  }

  const keyHandle = (e) => {
    if (e.key === "Enter" && searchData.length > 0) {
      navigate(`/search/${searchData}`)
      setIsSearchBoxOpen(false)
    }
  }

  const toggolHandel = () => {
    setIsSearchBoxOpen(!isSearchBoxOpen)
  }

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="px-[15px] md:px-10 flex justify-between items-center h-[30px] md:h-[60px] fixed z-10 bg-opacity-35 backdrop-blur-[8px] text-white w-full">
          <div>
            <img className="h-[25px] md:h-[50px] hover:cursor-pointer" onClick={() => navigate("/")} src={logo} alt="" />
          </div>
          <div>
            <ul className="flex gap-2 md:gap-5 text-[10px] md:text-[20px]">
              <li className="hover:text-[#DF4156] hover:cursor-pointer duration-200" onClick={() => navigateHandle("movie")}>Movies</li>
              <li className="hover:text-[#DF4156] hover:cursor-pointer duration-200" onClick={() => navigateHandle("tv")}>Tv shows</li>
              <li>
                {
                  !isSearchBoxOpen ? <HiOutlineSearch className="hover:text-[#DF4156] hover:cursor-pointer duration-200" onClick={toggolHandel} /> : <RiCloseFill className="hover:text-[#DF4156] hover:cursor-pointer duration-200" onClick={toggolHandel} />
                }
              </li>
            </ul>
          </div>
        </div>
      </div>

      {
        isSearchBoxOpen &&
        <div className='fixed w-full top=[60px] mt-[30px] md:mt-[60px] z-10 rounded-full flex justify-center '>
          <input
            type="text"
            className='w-[80%] h-[20px] md:h-[40px] text-[12px] md:text-[14px] indent-2 md:indent-5 rounded-s-full'
            values={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            onKeyUp={keyHandle}
          />
          <HiOutlineSearch className="text-[20px] md:text-[40px] bg-white rounded-e-full"
            onClick={() => {
              searchData.length > 0 &&
                setIsSearchBoxOpen(false)
              searchData.length > 0 &&
                navigate(`/search/${searchData}`)
            }} />
        </div>
      }
    </>
  )
}

export default Header