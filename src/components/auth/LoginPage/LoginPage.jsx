import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, txtDB } from "../../../firebase";

const LoginPage = () => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    const valRef = collection(txtDB, `LogoData`);
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data, "data");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      // Signed in
      const user = userCredential.user;
      localStorage.setItem("authenticated", true);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
      // Handle specific error cases if needed
      setError(true);
    }
  };

  return (
    <div className="z-40 h-[980px] bg-gray-50">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center ">
          <img
            src={require("./Logo.png")}
            alt="logo"
            width={50}
            height={50}
            className=" hover:bg-gray-100 hover:scale-75"
          />
          <h1 className="font-bold font-sans hover:font-serif">E-Libra</h1>
        </div>

        <form onSubmit={handleLogin}>
          <main
            className="flex-col items-center justify-center bg-white rounded-3xl 
          h-full md:px-8 sm:px-12 xs:px-8 w-[350px] sm:w-[500px] lg:w-[650px]"
          >
            <h1 className="text-center text-4xl pt-8 active:bg-blue-200 font-bold text-blue-700 book-title ">LogIn</h1>

            <div className="username mt-10 mx-auto flex flex-col max-w-sm">
              <input
                className="username border border-gray-600 text-gray-500 bg-gray-100 py-1 pl-5 w-full"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username or email"
              />

              <input
                className="mt-5 password border border-gray-600 text-gray-500 bg-gray-100 pl-5 py-1 w-full"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="password"
              />
            </div>

            <div className="mt-8 justify-center w-full flex items-center flex-col">
              {error && <span className="text-sm text-red-600 ">Wrong username or passowrd ! </span>}
              <button
                type="submit"
                className=" bg-blue-700 rounded-xl hover:bg-blue-800 py-2 text-white text-2xl 
                font-bold shadow-xl hover:shadow-lg sm:w-[30%] w-[50%] "
              >
                LOGIN
              </button>
            </div>

            <div className="mt-8 text-center flex justify-center w-full">
              <div className="flex">
                <button className="py-3 hover:text-blue-900"> Forgot Password &#10072; </button>
                <Link to={"/register"}>
                  <button className="py-3 text-blue-700 hover:text-blue-900" type="Register">
                    &#160;Register
                  </button>
                </Link>
              </div>
            </div>

            <ul className="flex justify-center items-center space-x-2">
              {data.map((value) => (
                <div
                  className="justify-between mt-5 flex border-blue-100 cursor-pointer border-2 rounded-lg
                 hover:bg-gray-200 text-black shadow-xl hover:shadow-lg w-[80%] mb-3
                 sm:px-1"
                >
                  <img
                    src={value.imgUrl}
                    alt="my image"
                    width={40}
                    height={40}
                    onClick={this}
                    className="hover:shadow-full hover:scale-90 m-1 ml-5"
                  />
                  <h1 className="mt-1.5 text-center flex-grow p-1"> {value.txtVal} </h1>
                </div>
              ))}
            </ul>
          </main>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
