// Import necessary modules
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  setModalType,
  signInSuccessful,
} from "../redux/user/userSlice";
import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Modal component
const Modal = () => {
  // Local state for form data, validation, loading status, and error handling
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [signupValidation, setSignupValidation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);

  // Redux hooks
  const dispatch = useDispatch();
  const { isModalOpen, modalType } = useSelector((state) => state.user);

  // If modal is not open, don't render anything
  if (!isModalOpen) return null;

  // Function to handle form data change
  const handleFormDataChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to handle email/password signup
  const handleEmailPasswordSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSignupError(null);

    // Validate password length
    if (formData.password.length < 6) {
      setSignupValidation("Password length must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("Email/password signup successful:", user);

      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      // Switch to login modal after signup
      if (modalType === "signup") {
        dispatch(setModalType("login"));
      }

      setLoading(false);
    } catch (error) {
      setSignupError("Internal Server Error, Try again later");
      setLoading(false);
      console.error("Error signing up with email/password:", error.message);
    }
  };

  // Function to handle Google signup
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google signup successful:", user);

      // Dispatch sign-in success action
      dispatch(
        signInSuccessful({
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      );

      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        createdAt: new Date(),
      });

      // Close modal after successful signup
      dispatch(toggleModal());
    } catch (error) {
      console.error("Error signing up with Google:", error.message);
    }
  };

  // Function to handle email/password sign in
  const handleEmailPasswordSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSignupError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("Email/password sign-in successful:", user);

      // Dispatch sign-in success action
      dispatch(signInSuccessful({ name: user.displayName, email: user.email }));

      // Close modal after successful sign-in
      dispatch(toggleModal());
      setLoading(false);
    } catch (error) {
      setSignupError("Wrong credentials, Try again");
      setLoading(false);
      console.error("Error signing in with email/password:", error.message);
    }
  };

  // Function to handle Google sign in
  const handleGoogleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful:", user);

      // Dispatch sign-in success action
      dispatch(
        signInSuccessful({
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      );

      // Close modal after successful sign-in
      dispatch(toggleModal());
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 font-semibold">
          {modalType === "login" ? "Log in" : "Sign up"} for Rotten Tomatoes
        </h2>
        <p className="mb-4">
          By continuing, you agree to the Privacy Policy and the Terms and
          Policies, and to receive email from us.
        </p>
        <button
          onClick={
            modalType === "login" ? handleGoogleSignin : handleGoogleSignup
          }
          className="w-full mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          {modalType === "login" ? "Login" : "Sign up"} with Google
        </button>
        <form
          onSubmit={
            modalType === "login"
              ? handleEmailPasswordSignIn
              : handleEmailPasswordSignup
          }
        >
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded"
              required
              onChange={handleFormDataChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded"
              required
              onChange={handleFormDataChange}
            />
          </div>
          {/* Display signup validation error */}
          {signupValidation && formData.password.length < 6 && (
            <p className="text-sm p-2 text-red-600">{signupValidation}</p>
          )}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded"
          >
            {loading
              ? "Loading..."
              : modalType === "login"
              ? "Sign In"
              : "Sign Up"}
          </button>
          {/* Display signup error */}
          {signupError && (
            <p className="p-2 text-sm text-red-600">{signupError}</p>
          )}
        </form>
        <div className="mt-4">
          {modalType === "login" ? (
            <p>
              Not a member yet?{" "}
              <button
                onClick={() => dispatch(setModalType("signup"))}
                className="text-blue-500 underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already a member?{" "}
              <button
                onClick={() => dispatch(setModalType("login"))}
                className="text-blue-500 underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>
        <button
          onClick={() => dispatch(toggleModal())}
          className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Export component
export default Modal;
