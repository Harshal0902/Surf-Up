import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as AuthorizationAction from "./framework/redux/module/Authorization";
import { useLoadScript } from "@react-google-maps/api";
import Main from "./main"

const GoogleAuth = ({ dispatch, isSignedIn, userId }) => {

  const {} = useLoadScript({
    googleMapsApiKey: "AIzaSyBsZrS5LkAXAqzgVYMJQQMYOoWgYCHHZTU" // Add your API key
  });


  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const params = {
      clientId:
        "404399157121-ml5edhir8sh3qk81o00opr0vogkua3it.apps.googleusercontent.com",
      scope: "email",
    };

    window.gapi.load("client:auth2", () => {
      window.gapi.client.init(params).then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      dispatch(
        AuthorizationAction.signIn(
          window.gapi.auth2.getAuthInstance().currentUser.get().getId()
        )
      );
    } else {
      dispatch(AuthorizationAction.signOut());
    }
  };

  const onSignInClick = () => {
    auth.signIn();
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <div>
          <Main />
        </div>
      );
    } else {
      return (
        <div className="center">
          <button className="GoogleSignIn" onClick={onSignInClick}>Sign In with Google</button>
          <img className="google-logo" src="https://img.icons8.com/fluent/25/000000/google-logo.png" />
        </div>)
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(GoogleAuth);
