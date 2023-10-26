import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { userRequestSuccess, updateMessage, requestStart, requestFailed } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      console.log("Google Result: ", result);

      dispatch(requestStart());

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          phone: result.user.phoneNumber,
          avatar: result.user.photoURL,
        }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(userRequestSuccess(data));

        setTimeout(() => { 
            dispatch(updateMessage(null));
            navigate('/');
        }, 1500);
      } else {
        dispatch(requestFailed(data.message));
      }
    } catch (error) {
      dispatch(requestFailed("Could not sign in with google!!"));
      // console.log("Could not sign in with google. ", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover: opacity-95"
    >
      Continue with Google
    </button>
  );
}
