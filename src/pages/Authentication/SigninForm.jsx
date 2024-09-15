import React from "react";
import UserForm from "../../components/UserForm";

const SigninForm = () => {
  return (
    <>
      <UserForm
        heading="Login in with Email"
        showFields={false}
        signupLogic={false}
      />
    </>
  );
};

export default SigninForm;
