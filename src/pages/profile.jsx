import { useSelector, useDispatch } from "react-redux";
import { requestStart, userRequestSuccess, deleteUserSuccess, requestFailed, updateMessage } from '../redux/user/userSlice.js'
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export default function Profile() {
  const { currentUser, loading, error, successMsg } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    dispatch(requestStart());
    try {

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setFileUploadError(null);
        setFileUploadPercent(null);

        dispatch(userRequestSuccess(data));

        setTimeout(() => dispatch(updateMessage(null)), 1500);

      } else {
        dispatch(requestFailed(data.message));
      }

    } catch (err) {
      dispatch(requestFailed(err.message));
    }
  }

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    dispatch(requestStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        dispatch(deleteUserSuccess());
        navigate('sign-in');
      } else {
        dispatch(requestFailed(data.message));
      }
    } catch (error) {
      dispatch(requestFailed(error.message));
    }
  }

  const handleLogout = () => {
    dispatch(deleteUserSuccess());
    navigate('sign-in');
  }

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

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover cursor-pointer mx-auto"
        />

        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error uploading Image (Image must be less than 2MB)</span>
          ) : 
          (fileUploadPercent > 0 && fileUploadPercent < 100) ?
            <span className="text-slate-700">Image Uploaded: {fileUploadPercent}%</span> :
          fileUploadPercent == 100 ? 
            <span className="text-green-700">Image Uploaded Successfully.</span> : ""
          }
        </p>

        <input
          type="text"
          name="name"
          id="name"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Full Name"
          onChange={handleChange}
          defaultValue={currentUser.name}
          required
        />
        <input
          type="number"
          name="phone"
          id="phone"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Phone No"
          onChange={handleChange}
          defaultValue={currentUser.phone || ''}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          className="border p-3 rounded-lg focus:outline-purple-600"
          placeholder="Email Id"
          defaultValue={currentUser.email}
          disabled
          readOnly
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
          <span onClick={handleDeleteUser} className="text-red-700 pl-2 float-left cursor-pointer">Delete Account</span>

          <span onClick={handleLogout} className="text-red-700 pl-2 float-right cursor-pointer">Sign Out</span>
        </p>
      </div>
    </div>
  );
}
