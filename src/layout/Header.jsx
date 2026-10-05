import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import logo from "../assets/movix-logo.svg"
import SearchForm from "../components/searchForm/SearchForm";

const NAV_LINKS = [
  { to: "/explore/movie", label: "Movies" },
  { to: "/explore/tv", label: "TV Shows" },
]

const navLinkClass = ({ isActive }) =>
  `hover:text-[#DF4156] duration-200 ${isActive ? "text-[#DF4156]" : ""}`

const iconButtonClass = "hover:text-[#DF4156] duration-200 flex items-center"

function Header() {
  // The open panel remembers the page it was opened on, so it is
  // considered closed as soon as the user navigates somewhere else.
  const [openPanel, setOpenPanel] = useState(null)
  const { pathname } = useLocation()

  const isOpen = (name) => openPanel?.name === name && openPanel.pathname === pathname
  const isSearchBoxOpen = isOpen("search")
  const isMenuOpen = isOpen("menu")

  const togglePanel = (name) => setOpenPanel(isOpen(name) ? null : { name, pathname })
  const toggleSearch = () => togglePanel("search")
  const toggleMenu = () => togglePanel("menu")

  const searchButton = (
    <button type="button" className={iconButtonClass} onClick={toggleSearch} aria-label={isSearchBoxOpen ? "Close search" : "Open search"} aria-expanded={isSearchBoxOpen}>
      {isSearchBoxOpen ? <RiCloseFill /> : <HiOutlineSearch />}
    </button>
  )

  return (
    <header className="fixed top-0 z-40 w-full text-white">
      <div className="px-[15px] md:px-10 flex justify-between items-center h-[40px] md:h-[60px] bg-[#04152d]/40 backdrop-blur-[8px]">
        <Link to="/" aria-label="MovieX home">
          <img className="h-[25px] md:h-[50px]" src={logo} alt="MovieX" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-5 text-[20px]">
            {NAV_LINKS.map(link => (
              <li key={link.to}><NavLink to={link.to} className={navLinkClass}>{link.label}</NavLink></li>
            ))}
            <li>{searchButton}</li>
          </ul>
        </nav>

        <div className="md:hidden flex items-center gap-5 text-[18px]">
          {searchButton}
          <button type="button" className={iconButtonClass} onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen}>
            {isMenuOpen ? <MdClose /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav aria-label="Mobile" className="md:hidden bg-[#020c1b] border-t border-[#173d77]">
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <NavLink to={link.to} className={(state) => `block px-[15px] py-3 ${navLinkClass(state)}`}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {isSearchBoxOpen && (
        <SearchForm
          autoFocus
          onSearch={() => setOpenPanel(null)}
          className="w-full py-2 md:py-3"
          inputClassName="h-[30px] md:h-[40px] text-[12px] md:text-[14px] indent-2 md:indent-5"
          buttonClassName="h-[30px] md:h-[40px] px-3 md:px-4 text-[18px] md:text-[24px] bg-white text-black"
        />
      )}
    </header>
  )
}

export default Header
