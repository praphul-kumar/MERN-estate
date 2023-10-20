import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFromData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        setSuccess(data.message);
        setError(null);
        setTimeout(() => navigate('/'), 1500);
      } else {
        setSuccess(null);
        setError(data.message);
      }
    } catch(error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold py-7">Sign In</h1>

      {success && <p className="bg-green-200 text-green-700 rounded-lg py-2 px-3 mb-4">{success}</p>}
      {error && <p className="bg-red-200 text-red-700 rounded-lg py-2 px-3 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input type="email" name="email" id="email" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Email Id" onChange={handleChange} required/>
        <input type="password" name="password" id="password" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Password" onChange={handleChange} required/>

        <button disabled={loading} className="bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Signing In..." : "Sign In"}</button>
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
