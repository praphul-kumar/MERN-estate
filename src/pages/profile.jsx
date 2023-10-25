import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error, successMsg } = useSelector((state) => state.user);

  const handleChange = () => {

  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold py-7">Profile</h1>

      {successMsg && <p className="bg-green-200 text-green-700 rounded-lg py-2 px-3 mb-4">{successMsg}</p>}
      {error && <p className="bg-red-200 text-red-700 rounded-lg py-2 px-3 mb-4">{error}</p>}

      <form className="flex flex-col gap-4">
        <img src={currentUser.photo} alt="Profile" className="rounded-full w-24 h-24 object-cover cursor-pointer mx-auto" />
        
        <input type="text" name="name" id="name" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Full Name" onChange={handleChange} value={currentUser.name} required/>
        <input type="number" name="phone" id="phone" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Phone No" onChange={handleChange} value={currentUser.phone} required/>
        <input type="email" name="email" id="email" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Email Id" onChange={handleChange} value={currentUser.email} required/>
        <input type="password" name="password" id="password" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Password" onChange={handleChange} />

        <button disabled={loading} className="bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Updating..." : "Update Profile"}</button>

      </form>

      <div className="mt-4">
        <p> 
          <Link to={"/delete-account"}>
            <span className="text-red-700 pl-2 float-left">Delete Account</span>
          </Link>
          
          <Link to={"/sign-out"}>
            <span className="text-red-700 pl-2 float-right">Sign Out</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
