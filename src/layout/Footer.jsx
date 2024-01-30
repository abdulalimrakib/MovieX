import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-white bg-black py-5 relative bottom-0">
      <div className="grid gap-2 grid-cols-2 md:flex md:flex-col text-start">
        <div className="flex justify-center ">
          <ul className="md:flex justify-center md:my-5 md:gap-5 text-[14px] md:text-[20px]">
            <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200 text-[12px] md:text-[16px] py-1">Terms Of Use</li>
            <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200 text-[12px] md:text-[16px] py-1">Privacy-Policy</li>
            <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200 text-[12px] md:text-[16px] py-1">About</li>
            <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200 text-[12px] md:text-[16px] py-1">Blog</li>
            <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200 text-[12px] md:text-[16px] py-1">FAQ</li>
          </ul>
        </div>
        <div className="md:px-[50px] text-center text-gray-300 text-[8px] md:text-[16px] flex items-center px-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur.
        </div>
      </div>
      <div className="flex justify-center mt-5 gap-5 text-[14px] md:text-[22px]">
        <a href="https://www.facebook.com/abdulalim.rakib.5" target="_blank" rel="noreferrer" className="bg-[#04152D] p-2 md:p-3 rounded-full hover:cursor-pointer hover:text-[#0866FF] duration-200">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/rakib.abdulalim" target="_blank" rel="noreferrer" className="bg-[#04152D] p-2 md:p-3 rounded-full hover:cursor-pointer hover:text-[#F73A22] duration-200">
          <FaInstagram />
        </a>
        <a href="https://twitter.com/abdul_alim61863" target="_blank" rel="noreferrer" className="bg-[#04152D] p-2 md:p-3 rounded-full hover:cursor-pointer hover:text-[#1DA1F2] duration-200">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com/in/abdul-alim-rakib1" target="_blank" rel="noreferrer" className="bg-[#04152D] p-2 md:p-3 rounded-full hover:cursor-pointer hover:text-[#0864C0] duration-200">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  )
}

export default Footer