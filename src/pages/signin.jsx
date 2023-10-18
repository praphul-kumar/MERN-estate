import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold py-7">Sign In</h1>

      <form className="flex flex-col gap-4">
        
        <input type="email" name="email" id="email" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Email Id" />
        <input type="password" name="password" id="password" className="border p-3 rounded-lg focus:outline-purple-600" placeholder="Password" />

        <button className="bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
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
