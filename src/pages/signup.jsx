import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage, requestStart, requestFailed, userRequestSuccess } from "../redux/user/userSlice";

export default function SignUp() {
  const [formData, setFromData] = useState({});
  const dispatch = useDispatch();
  const { loading, error, successMsg } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form Data.");

    try {
      dispatch(requestStart());

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(userRequestSuccess(data));
        setTimeout(() => {
          dispatch(updateMessage(null));
          navigate('/sign-in')}, 1500);
      } else {
        dispatch(requestFailed(data.message));
      }

    } catch (error) {
      dispatch(requestFailed(error.message));
    }

  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold py-7">Sign Up</h1>

      {successMsg && <p className="bg-green-200 text-green-700 rounded-lg py-2 px-3 mb-4">{successMsg}</p>}
      {error && <p className="bg-red-200 text-red-700 rounded-lg py-2 px-3 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          id="name"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phone"
          id="phone"
          min="6000000000"
          max="9999999999"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Email Id"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <OAuth />
      </form>

      <div className="mt-4">
        <p>
          Have an Account?
          <Link to={"/sign-in"}>
            <span className="text-purple-700 pl-2">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
