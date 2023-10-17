import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to='/'>
          <h1 className="font-bold text-sm sm:text-2xl">
            <span className="text-purple-600">Fuel</span>
            <span className="text-black">Estate</span>
          </h1>
        </Link>

        <form className="flex justify-between items-center bg-slate-100 p-3 rounded-lg">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="bg-transparent w-24 sm:w-64 focus:outline-none"
          />

          <FaSearch className="text-purple-600" />
        </form>

        <ul className="flex gap-4 ">
          <li className="">
            <Link to="/" className="hover:text-purple-600">
              Home
            </Link>
          </li>
          <li className="">
            <Link to="/about" className="hover:text-purple-600">
              About
            </Link>
          </li>
          <li className="">
            <Link to="/sign-in" className="hover:text-purple-600">
              SignIn
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
