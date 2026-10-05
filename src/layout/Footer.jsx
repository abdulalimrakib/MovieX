import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/abdulalim.rakib.5", label: "Facebook", icon: <FaFacebookF />, hover: "hover:text-[#0866FF]" },
  { href: "https://www.instagram.com/rakib.abdulalim", label: "Instagram", icon: <FaInstagram />, hover: "hover:text-[#F73A22]" },
  { href: "https://twitter.com/abdul_alim61863", label: "Twitter", icon: <FaTwitter />, hover: "hover:text-[#1DA1F2]" },
  { href: "https://www.linkedin.com/in/abdul-alim-rakib1", label: "LinkedIn", icon: <FaLinkedin />, hover: "hover:text-[#0864C0]" },
]

function Footer() {
  return (
    <footer className="text-white bg-black py-8 px-4">
      <p className="max-w-[800px] mx-auto text-center text-gray-300 text-[12px] md:text-[16px] leading-relaxed">
        MovieX lets you browse trending, popular and top rated movies and TV shows,
        watch trailers and discover something new to watch.
      </p>
      <p className="mt-3 text-center text-gray-500 text-[10px] md:text-[13px]">
        This product uses the{" "}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="underline hover:text-[#DF4156]">TMDB</a>
        {" "}API but is not endorsed or certified by TMDB.
      </p>
      <div className="flex justify-center mt-6 gap-5 text-[14px] md:text-[22px]">
        {SOCIAL_LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className={`bg-[#04152D] p-2 md:p-3 rounded-full duration-200 ${link.hover}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
