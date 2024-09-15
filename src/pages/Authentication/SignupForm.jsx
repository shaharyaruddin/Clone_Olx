import React from "react";
import UserForm from "../../components/UserForm";

const SignupForm = () => {
  return (
    <>
      <UserForm
        heading="Create account with Email"
        showFields={true}
        signupLogic={true}
      />
    </>
  );
};

export default SignupForm;
