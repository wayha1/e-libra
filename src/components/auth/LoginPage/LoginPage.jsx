import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, txtDB } from "../../../firebase";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null); // New state to store user information

  const getData = async () => {
    const valRef = collection(txtDB, `LogoData`);
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
      setError(true);
    }
  };
  if (user) {
    navigate("/");
  }
  return (
    <div className="flex h-screen bg-gray-50 items-center justify-center">
      <div className="flex flex-col w-[70%]">
        <div className="bg-white shadow-xl rounded-xl items-center flex flex-col">
          <img src={require("./Logo.png")} alt="logo" width={50} height={50} className=" hover:scale-75 " />
          <h1 className="font-bold font-sans hover:font-serif">E-Libra</h1>

          <form onSubmit={handleLogin}>
            <main
              className="flex-col items-center justify-center bg-white rounded-3xl 
          h-full md:px-8 sm:px-12 xs:px-8"
            >
              <h1 className="text-center text-4xl pt-8 font-bold text-gray-700 book-title ">Log In</h1>

              <div className="mt-8 px-5 flex flex-col max-w-sm space-y-5">
                <input
                  className="border border-gray-300 rounded-md text-gray-200 py-2 px-4"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username or email"
                />

                <input
                  className="border border-gray-300 rounded-md text-gray-200 py-2 px-4"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="password"
                />
              </div>

              <div className="mt-5 justify-center w-full flex items-center flex-col">
                {error && <span className="text-sm text-red-600 ">Wrong username or passowrd ! </span>}
                <button
                  type="submit"
                  className="bg-blue-600 w-[40%] text-center py-2 rounded-xl hover:bg-blue-800 
                          shadow-xl text-white "
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
    </div>
  );
};

export default LoginPage;
