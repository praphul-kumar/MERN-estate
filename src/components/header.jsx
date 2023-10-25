import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to='/'>
          <h1 className="font-bold text-sm sm:text-2xl">
            <span className="text-purple-700">Fuel</span>
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

        <ul className="flex items-center gap-4 ">
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
            <Link to="/profile" className="hover:text-purple-600">
            {
              (currentUser != null && currentUser.photo != null) ? <img src={currentUser.photo} alt="Profile" className="w-10 h-10 object-cover rounded-full" /> : 'Sign In'
            }
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
