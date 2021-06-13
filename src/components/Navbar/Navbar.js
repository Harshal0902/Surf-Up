import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoadScript } from "@react-google-maps/api";
import * as AuthorizationAction from "../../framework/redux/module/Authorization";
import './Navbar.css';

function Navbar({ dispatch, isSignedIn, userId }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { isLoaded } = useLoadScript({
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


  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Surf Up
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/hi' className='nav-links' style={{ color: "#1aff1a", hover: "none" }} onClick={closeMobileMenu}>
              A/आ
            </Link>
          </li>

          <li className='nav-item' style={{ cursor: "pointer" }}>
            <img alt="logout" onClick={onSignOutClick} src="https://img.icons8.com/flat-round/30/000000/back--v1.png" />
          </li>

        </ul>
      </nav>
    </>
  );
}

export default Navbar;
