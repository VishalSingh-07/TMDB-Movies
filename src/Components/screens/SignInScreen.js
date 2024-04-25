import React, { useState } from "react";
import { auth } from "../../firebase";
import "../../assests/styles/SignInScreen.css";
import Loader from "../common/Loading";
function SignInScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [Loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (signup) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          auth.currentUser.updateProfile({
            displayName: name,
            photoURL: `https://avatars.dicebear.com/4.5/api/gridy/${email}.svg`,
          });
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          //     setError(error.message);
          setLoading(false);
          alert(error);
        });
    }
  };
  return (
    <div className='signUpScreen'>
      <form onSubmit={handleSubmit}>
        <h1>{signup ? "Sign Up" : "Sign In"}</h1>
        {signup && (
          <div className='input'>
            <label>Full Name</label>
            <input
              type='text'
              required={signup}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='John Doe'
            />
          </div>
        )}
        <div className='input'>
          <label>Email Address</label>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='johndoe@gmail.com'
          />
        </div>
        <div className='input'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='••••••••'
          />
        </div>

        {!signup && (
          <button className='' type='submit'>
            Sign In
          </button>
        )}

        {signup && (
          <button className='' type='submit'>
            Sign Up Now
          </button>
        )}

        <h4>
          <span className='signupScreen_gray'>
            {signup ? "Already have an account? " : "New to Netflix?   "}
          </span>
          <span
            className='signupScreen_link'
            onClick={() => {
              setSignup(!signup);
            }}>
            {signup ? "Sign In" : "Sign Up Now"}
          </span>
        </h4>
      </form>
      {Loading ? <Loader /> : null}
    </div>
  );
}

export default SignInScreen;
