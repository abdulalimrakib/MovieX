import { Link } from "react-router-dom"
import useDocumentTitle from "../hooks/useDocumentTitle"

function NotFound() {
  useDocumentTitle("Page not found")

  return (
    <div className="min-h-[80vh] flex flex-col gap-6 justify-center items-center px-4 text-center">
      <h1 className="text-3xl md:text-5xl text-[#c12e5b] font-bold">404</h1>
      <p className="text-white text-[16px] md:text-[20px]">Sorry, the page you are looking for doesn&apos;t exist.</p>
      <Link to="/" className="text-white px-6 py-2 rounded-full bg-linear-to-r from-[#FD8E28] to-[#CD1563]">
        Back to home
      </Link>
    </div>
  )
}

export default NotFound
