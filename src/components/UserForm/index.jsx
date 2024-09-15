import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const UserForm = ({ heading, showFields, signupLogic }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupLogic) {
      // Signup Logic
      if (!name) {
        toast.error("Enter your Name");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userId = userCredential.user.uid;

        // Add data in the firestore database with Authentication UID
        await setDoc(doc(firestore, "users", userId), {
          name: name,
          email: email,
          password: password,
        });
        navigate("/login");
      } catch (error) {
        console.error("Error signing up:", error);
        toast.error(error.message);
      }
    } else {
      // Signin Logic
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        toast.success("Successfully logged in");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="relative bg-white p-8 rounded-lg shadow-md w-96 h-[500px] flex flex-col items-center justify-center">
          <div className="absolute top-4 right-4">
            <Link className="text-3xl" to="/login">
              <IoClose />
            </Link>
          </div>
          <h1 className="text-2xl pb-10 font-semibold text-center">
            {heading}
          </h1>
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              {showFields && (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700">
                      Full Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 px-3 py-3 border rounded-md focus:outline-none focus:border-[#23e5db] w-full sm:text-sm"
                    />
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 px-3 py-3 border rounded-md focus:outline-none focus:border-[#23e5db] w-full sm:text-sm"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 px-3 py-3 border rounded-md focus:outline-none focus:border-[#23e5db] w-full sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#002f34] text-white text-sm font-bold rounded-md shadow-sm focus:outline-none"
              >
                {signupLogic ? "Sign Up" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
