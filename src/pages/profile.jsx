import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export default function Profile() {
  const { currentUser, loading, error, successMsg } = useSelector(
    (state) => state.user
  );
  const fileRef = useRef(null);
  
  const [formData, setFromData] = useState({});

  const [file, setFile] = useState(undefined);
  const [fileUploadPercent, setFileUploadPercent] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on( "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log(`Upload is ${progress}% done`);
        setFileUploadPercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error.message);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFromData({
            ...formData,
            'avatar': downloadURL
          })
        })
      }
    );
  };

  // console.log(file);
  console.log(formData);

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold py-7">Profile</h1>

      {successMsg && (
        <p className="bg-green-200 text-green-700 rounded-lg py-2 px-3 mb-4">
          {successMsg}
        </p>
      )}
      {error && (
        <p className="bg-red-200 text-red-700 rounded-lg py-2 px-3 mb-4">
          {error}
        </p>
      )}

      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover cursor-pointer mx-auto"
        />

        {fileUploadPercent ? (
          <p className="text-green-700 text-center">
            File Uploaded {fileUploadPercent}%
          </p>
        ) : (
          ""
        )}

        {fileUploadError ? (
          <p className="text-red-700 text-center">
            {fileUploadError}
          </p>
        ) : (
          ""
        )}

        <input
          type="text"
          name="name"
          id="name"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Full Name"
          onChange={handleChange}
          value={currentUser.name}
          required
        />
        <input
          type="number"
          name="phone"
          id="phone"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Phone No"
          onChange={handleChange}
          value={currentUser.phone || ''}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Email Id"
          onChange={handleChange}
          value={currentUser.email}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
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
  );
}
