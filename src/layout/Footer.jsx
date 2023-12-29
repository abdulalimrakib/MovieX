import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-white bg-black py-5 relative">
      <ul className="flex justify-center my-5 gap-5 text-[20px]">
        <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200">Terms Of Use</li>
        <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200">Privacy-Policy</li>
        <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200">About</li>
        <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200">Blog</li>
        <li className="hover:cursor-pointer hover:text-[#DF4156] duration-200">FAQ</li>
      </ul>
      <div className="px-[50px] text-center text-[16px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur.
      </div>
      <div className="flex justify-center mt-5 gap-5 text-[22px]">
        <span className="bg-[#04152D] p-3 rounded-full hover:cursor-pointer hover:text-[#0866FF] duration-200">
          <FaFacebookF />
        </span>
        <span className="bg-[#04152D] p-3 rounded-full hover:cursor-pointer hover:text-[#F73A22] duration-200">
          <FaInstagram />
        </span>
        <span className="bg-[#04152D] p-3 rounded-full hover:cursor-pointer hover:text-[#1DA1F2] duration-200">
          <FaTwitter />
        </span>
        <span className="bg-[#04152D] p-3 rounded-full hover:cursor-pointer hover:text-[#0864C0] duration-200">
          <FaLinkedin />
        </span>
      </div>
    </footer>
  )
}

export default Footer