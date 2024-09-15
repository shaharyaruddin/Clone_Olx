import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";

const Form = ({
  heading,
  title,
  title1,
  description,
  showFields,
  route,
  routeEmail,
}) => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const navigate = useNavigate();

  const joinWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
      toast.success("Successfully logged in");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-sm w-full md:rounded-lg md:shadow-lg bg-white p-6 md:border h-[500px] flex flex-col justify-center relative">
          <div className="absolute top-4 right-4">
            <Link className="text-3xl" to="/">
              <IoClose />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-8 text-[#002F34]">Olx</h1>
            <p className="text-[#002F34] font-semibold pb-8 text-2xl">
              {heading}
            </p>
          </div>
          <div className="space-y-4">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium border-2 border-black text-[#002F34] text-lg h-10 px-4 py-5 w-full"
              onClick={joinWithGoogle}
            >
              <FcGoogle className="mx-2 text-2xl" />
              {title}
            </button>

            <div className="flex items-center space-x-2">
              <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
              <span className="text-zinc-400 dark:text-zinc-300 text-sm">
                OR
              </span>
              <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
            </div>
            <Link
              to={routeEmail}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium border-2 border-black text-[#002F34] text-lg h-10 px-4 py-5 w-full"
            >
              <MdOutlineEmail className="mx-2 text-2xl" />
              {title1}
            </Link>
            <div className="py-2">
              {showFields && (
                <p className="text-sm text-center pb-6">
                  When creating a new account you agree to{" "}
                  <b>
                    <u>OLX's Terms and conditions</u>
                  </b>{" "}
                  and{" "}
                  <b>
                    <u>Privacy Policy</u>
                  </b>
                </p>
              )}
              <Link
                to={route}
                className="flex justify-center text-[#3A77FF] font-bold"
              >
                {description}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
