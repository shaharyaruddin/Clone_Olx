import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase/firebase";

const auth = getAuth(app);

const PageWrapper = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("You are logged in", user);
        setUser(user);
      } else {
        console.log("You are logged out", user);
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default PageWrapper;
