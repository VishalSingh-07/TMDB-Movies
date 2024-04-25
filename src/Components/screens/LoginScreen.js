import React from "react";
import "../../assests/styles/LoginScreen.css";
import logo from "../../assests/Image/Navbar_Logo.svg";
import SignInScreen from "./SignInScreen";

function LoginScreen() {
  const [signIn, setSignIn] = React.useState(false);
  return (
    <>
      <div className='loginScreen'>
        <div className='loginScreen_background'>
          <img className='loginScreen_logo' src={logo} alt='logo' />
          <button className='button' onClick={() => setSignIn(true)}>
            <span className='text'>Sign In</span>
          </button>
          <div className='loginScreen_gradient'></div>
        </div>
        <div className='loginScreen_body'>
          {signIn ? (
            <SignInScreen />
          ) : (
            <>
              <h1>Unlimited films, TV programmes and more.</h1>
              <h2>Watch anywhere. Cancel at any time</h2>
              <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

              <div className='loginScreen_Input'>
                <form>
                  <input type='email' placeholder='Email Address' />
                  <button className='button' onClick={() => setSignIn(true)}>
                    <span className='text'>GET STARTED</span>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
