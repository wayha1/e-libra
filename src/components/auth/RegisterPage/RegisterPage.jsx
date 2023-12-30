import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const RegisterPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPassRef.current.value;

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      // If successful, you can redirect or perform other actions here
    } catch (error) {
      setError("Failed to create account");
      console.error("Error creating account:", error);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleRegister}>
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <main className="flex flex-col w-[70%]">
          <div className="bg-white shadow-xl rounded-xl items-center flex flex-col space-y-10">
            <h1 className="text-3xl font-bold text-gray-700 mt-4">Sign Up</h1>

            <div className="flex flex-col space-y-5">
              <input
                ref={nameRef}
                className="border border-gray-300 rounded-md text-gray-200 py-2 px-4"
                type="text"
                placeholder="Name"
              />
              <input
                ref={emailRef}
                className="border border-gray-300 rounded-md text-gray-200 py-2 px-4"
                type="email"
                placeholder="Email"
              />
              <input
                ref={passwordRef}
                className="border border-gray-300 rounded-md text-gray-200 py-2 px-4"
                type="password"
                placeholder="Password"
              />
              <input
                ref={confirmPassRef}
                className="border border-gray-300 rounded-md text-gray-200 py-2 px-4"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            {error && <div className="text-red-600 text-md mt-2">{error}</div>}
            <button
              type="submit"
              className="bg-blue-600 w-[40%] text-center py-2 rounded-xl hover:bg-blue-800"
              disabled={loading}
            >
              <div className="text-white text-xl">Sign Up</div>
            </button>

            <div className="flex text-center py-3">
              <h1 className="">You already have an account! &#10072;</h1>
              <Link to={"/login"}>
                <button className="text-blue-700 hover:text-blue-900" type="submit">
                  &#160;Log In
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </form>
  );
};

export default RegisterPage;
