import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import google from "./../../../asset/google.png"
import GoogleLogin from "../LoginWithGoogle/GoogleLogin";
import phone from "./../../../asset/Phone1.png";
import PhoneLogin from "../LoginWithPhone/PhoneLogin";
import { Image } from "react-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate, user]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
      setError(true);
    }
  };
  return (
    <div className="flex h-screen bg-gray-50 items-center justify-center">
      <div className="flex flex-col w-[70%]">
        <div className="bg-white shadow-xl rounded-xl items-center flex flex-col py-10">
          <form onSubmit={handleLogin}>
            <main className="w-full space-y-10">
              <h1 className="text-center text-4xl pt-8 font-bold text-gray-700 ">
                Sign In
              </h1>
              <div className="flex flex-col px-3 py-2 space-y-5">
                <input
                  className={`border border-gray-300 rounded-md py-2 px-4 ${username ? "text-gray-600" : "text-gray-200"
                    }`}
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username or email"
                />

                <input
                  className={`border border-gray-300 rounded-md py-2 px-4 ${password ? "text-gray-600" : "text-gray-200"
                    }`}
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="password"
                />
              </div>

              <div className="mt-5 justify-center w-full flex items-center flex-col">
                {error && (
                  <span className="text-sm text-red-600 ">
                    Wrong username or passowrd !{" "}
                  </span>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 w-[40%] text-center py-2 rounded-xl hover:bg-blue-800 
                          shadow-xl text-white "
                >
                  Sign In
                </button>
              </div>

              <div className="mt-8 text-center flex justify-center w-full">
                <div className="flex">
                  <button className="py-3 hover:text-blue-900">
                    {" "}
                    Forgot Password &#10072;{" "}
                  </button>
                  <Link to={"/register"}>
                    <button
                      className="py-3 text-blue-700 hover:text-blue-900"
                      type="Register"
                    >
                      &#160;Sign Up
                    </button>
                  </Link>
                </div>
              </div>

              <ul className="flex justify-center items-center space-x-5">
                <div
                  className="my-6 flex border-blue-100 border-2 rounded-lg
                  hover:bg-gray-200  shadow-xl hover:shadow-lg w-[200%] max-sm:justify-center
                    sm:px-1"
                >
                  <Image
                    src={google}
                    alt="my image"
                    width={50}
                    height={40}
                    onClick={this}
                    className="hover:shadow-full hover:scale-110 mx-2 my-1 "
                  />
                  <h1 className="flex whitespace-nowrap max-sm:hidden px-2 items-center text-gray-600">
                    <GoogleLogin />
                  </h1>
                </div>
                <div
                  className="my-6 flex border-blue-100 border-2 rounded-lg
                  hover:bg-gray-200  shadow-xl hover:shadow-lg w-[250%] max-sm:justify-center
                    sm:px-1"
                >
                  <Image
                    src={phone}
                    alt="my image"
                    width={50}
                    height={40}
                    onClick={this}
                    className="hover:shadow-full hover:scale-110 mx-2 my-1 "
                  />
                  <h1 className="flex whitespace-nowrap max-sm:hidden px-2 items-center text-gray-600">
                    <PhoneLogin />
                  </h1>
                </div>
              </ul>
            </main>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
