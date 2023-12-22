import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, txtDB } from "../../firebase";

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

  console.log(data, "datadata");

  const navitage = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("authenticated", true);
        navitage("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="z-40 h-[980px] bg-gray-100">
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
          <main className="flex-col items-center justify-center bg-white rounded-3xl h-full md:px-8 sm:px-12 xs:px-8 w-[350px] sm:w-[500px] lg:w-[550px]">
            <h1 className="text-center text-4xl pt-8 font-bold text-blue-700">LogIn</h1>

            <div className="username mt-10 mx-[10%]">
              <input
                className="username border border-gray-600 rounded-lg text-gray-500 bg-gray-100 py-1 pl-5 w-full"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username or email"
              />

              <input
                className="mt-5 password border border-gray-600 rounded-lg text-gray-500 bg-gray-100 pl-5 py-1 w-full"
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
                className=" bg-blue-700 rounded-xl hover:bg-blue-800 py-2 text-white text-2xl font-bold shadow-xl shadow-inner hover:shadow-lg sm:w-[80%] w-[50%]"
              >
                LogIn
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

            <ul className="justify-center items-center flex flex-col my-5">
              {data.map((value) => (
                <div className="justify-between px-4 mt-5 flex bg-gray-400 rounded-xl hover:bg-gray-500 text-white shadow-xl hover:shadow-lg w-[80%] sm:px-1">
                  <h1 className="mt-1.5 whitespace-nowrap "> {value.txtVal} </h1>
                  <img
                    src={value.imgUrl}
                    alt="my image"
                    width={40}
                    height={40}
                    onClick={this}
                    className="hover:shadow-full hover:scale-90 "
                  />
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
