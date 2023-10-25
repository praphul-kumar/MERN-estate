import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure, updateMessage } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFromData] = useState({});
  const { loading, error, successMsg } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
  
      if (data.success) {
        dispatch(signInSuccess(data));
        setTimeout(() => {
          dispatch(updateMessage(null));
          navigate('/');
        }, 1500);
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch(error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold py-7">Sign In</h1>

      {successMsg && <p className="bg-green-200 text-green-700 rounded-lg py-2 px-3 mb-4">{successMsg}</p>}
      {error && <p className="bg-red-200 text-red-700 rounded-lg py-2 px-3 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input type="email" name="email" id="email" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Email Id" onChange={handleChange} required/>
        <input type="password" name="password" id="password" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Password" onChange={handleChange} required/>

        <button disabled={loading} className="bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Signing In..." : "Sign In"}</button>

        <OAuth />
      </form>

      <div className="mt-4">
        <p>
          Do not have an Account? 
          <Link to={"/sign-up"}>
            <span className="text-purple-700 pl-2">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
