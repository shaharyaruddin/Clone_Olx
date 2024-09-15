import React from "react";
import Form from "../../components/Form";

const LoginLayout = () => {
  return (
    <Form
      heading="Login to your OLX account"
      title="Login with Google"
      title1="Login with Email"
      description="New to OLX? Create an account"
      showFields={false}
      route="/signup"
      routeEmail="/SigninEmail"
    />
  );
};

export default LoginLayout;
