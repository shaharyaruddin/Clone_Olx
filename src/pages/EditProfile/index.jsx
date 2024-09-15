import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories";
import profileIcon from "/assets/icons/profile-icon.png";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { app } from "../../firebase/firebase";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

const EditProfile = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const firestore = getFirestore(app);
  const navigation = useNavigate();

  // Update User data from Firestore
  const updateData = async () => {
    const userRef = doc(firestore, "users", user.uid);
    await updateDoc(userRef, {
      name: name,
      email: email,
    })
      .then(() => {
        toast.success("Document successfully updated!");
      })
      .catch((error) => {
        toast.error("Error updating document: ", error);
      });
  };

  //Get User detail from Firestore
  useEffect(() => {
    const fetchName = async () => {
      if (user.displayName) {
        setEmail(user.email);
        setName(user.displayName);
      } else {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name);
          setEmail(userData.email);
        }
      }
    };
    fetchName();
  }, [user, firestore]);

  return (
    <>
      <PageWrapper>
        <Categories />
        <div className=" w-2/3 m-auto ">
          <div className="border rounded px-2 pt-3 sm:px-6 lg:px-8 ">
            <h1 className=" py-3 text-xl font-semibold">Edit Profile</h1>
            <div className="border-y py-4">
              <h5 className="py-2 text-md font-semibold">Profile Photo</h5>
              <div className="flex items-center gap-5">
                <img src={profileIcon} width={95} />
                <div className="flex flex-col gap-1">
                  <button className="border w-36 h-12 rounded bg-[#002f34] text-white">
                    Upload Phote
                  </button>
                  <div className="flex gap-1">
                    <IoMdInformationCircleOutline />
                    <p className="text-[12px]">
                      JPG, JPEG, PNG Min: 400px, Max: 1024px
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <form>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold py-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className=" border border-black rounded w-2/5 h-12 p-3 focus:border-[#23e5db] outline-none"
                  />

                  <label className="text-sm font-semibold py-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    placeholder="Name"
                    className=" border border-black rounded w-2/5 h-12 p-3 focus:border-[#23e5db] outline-none"
                  />
                  <label className="text-sm font-semibold py-2">Gender</label>
                  <input
                    type="text"
                    placeholder="Select your gender"
                    className=" border border-black rounded w-2/5 h-12 p-3 focus:border-[#23e5db] outline-none"
                  />
                  <textarea
                    placeholder="Abot me (optional)"
                    rows="6"
                    className="w-2/5 border border-black rounded my-5 p-3 focus:border-[#23e5db] outline-none "
                  />
                </div>
              </form>
            </div>
            <div className="py-6 border-y flex flex-col gap-7">
              <h3 className="pt-2 text-md font-semibold">
                Contact information
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Phone number"
                  className=" border border-black rounded w-2/5 h-12 p-3 focus:border-[#23e5db] outline-none"
                />
                <p className="text-sm text-gray-400">
                  This is the number for buyers contacts, reminders, and other
                  notifications.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className=" border border-black rounded w-2/5 h-12 p-3 focus:border-[#23e5db] outline-none"
                />
                <p className="text-sm text-gray-400">
                  We won't reveal your email to anyone else nor use it to send
                  you spam
                </p>
              </div>
            </div>
            <h3 className="pt-6 text-md font-semibold">Optional information</h3>
            <div className="border-b flex flex-row py-4 gap-6 items-center">
              <div>
                <div className="flex flex-col">
                  <h4>Facebook</h4>
                  <p>
                    Sign in with Facebook and discover your trusted connections
                    to buyers
                  </p>
                </div>
                <div className="flex flex-col pt-4">
                  <h4>Google</h4>
                  <p>
                    Connect your OLX account to your Google account for
                    simplicity and ease
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button className="border-2 border-black w-64 h-12 rounded text-[#002f34] ">
                  Connect
                </button>
                <button className="border-2 border-black w-64 h-12 rounded text-[#002f34] ">
                  Disconnect
                </button>
              </div>
            </div>
            <div className="flex justify-between py-6 items-center">
              <Link to="/" className="font-bold underline">
                Discard
              </Link>
              <button
                className="border w-36 h-12 rounded bg-[#002f34] text-white"
                onClick={updateData}
              >
                Save Changes
              </button>
            </div>
          </div>
          <div className="border rounded px-2 pt-3 sm:px-6 lg:px-8 ">
            <h1 className=" py-3 text-xl font-semibold">Delete this account</h1>
            <div className="flex flex-col gap-4 border-t">
              <h3 className=" py-3 text-xl font-semibold">
                Are you sure you want to delete your account?
              </h3>
              <button className="border-2 border-black w-64 h-12 rounded text-[#002f34] ">
                Yes, delete my account
              </button>
              <p className="font-bold underline">See more info</p>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default EditProfile;
