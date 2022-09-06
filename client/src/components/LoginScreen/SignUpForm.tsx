import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface Props {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUpForm(props: Props) {
  let navigate = useNavigate();
  const { setSignUp } = props;
  const { setcurrentUser } = useContext(UserContext);

  const [formInput, setformInput] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [disable, setDisable] = useState({
    class: "cursor-not-allowed disabled:opacity-25",
    disable: true,
  });

  const conditions = {
    first: formInput.username.match(/^.{3,18}$/g),
    second:
      formInput.username.match(/^[\w]*$/g) &&
      formInput.username.match(/^[A-Za-z]/g),
    third: formInput.email.match(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
    ),
    fourth: formInput.password.match(/^.{8,18}$/g),
    fifth: formInput.password.match(/(?=.*[a-z])(?=.*[A-Z])/g),
    sixth: formInput.password.match(/^[\w\d~!@#$%^&*-=+?]+$/g),

    seventh:
      formInput.password === formInput.password_confirmation &&
      formInput.password.length > 0,
  };

  useEffect(() => {
    if (
      conditions.first &&
      conditions.second &&
      conditions.third &&
      conditions.fourth &&
      conditions.fifth &&
      conditions.sixth &&
      conditions.seventh
    ) {
      setDisable({ class: "", disable: false });
    } else {
      if (!disable.disable) {
        setDisable({
          class: "cursor-not-allowed disabled:opacity-25",
          disable: true,
        });
      }
    }
  }, [formInput]);

  function onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newInput = {
      ...formInput,
      [e.target.name]: e.target.value,
    };
    setformInput(newInput);
  }

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            setcurrentUser(data);
            navigate("/marketplace/1");
          });
        } else {
          res.json().then((e) => alert(e.errors));
        }
      })
      .catch(console.error);
  }

  return (
    <div className="bg-gradient-to-r from-white/90 to-gray-500/80 rounded-lg flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 mx-10 text-center text-3xl tracking-tight font-bold text-blue-700">
            Join and Create!
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSignUp}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formInput.username}
                onChange={onFormChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Username
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="xyz@email.com"
                value={formInput.email}
                onChange={onFormChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formInput.password}
                onChange={onFormChange}
              />
            </div>
            <div>
              <label htmlFor="password_confirmation" className="sr-only">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Comfirm password"
                value={formInput.password_confirmation}
                onChange={onFormChange}
              />
            </div>
          </div>

          <div className="font-bold">
            <p className={conditions.first ? "text-green-600" : "text-red-600"}>
              * username must be between 3 - 20 charaters
            </p>
            <p
              className={conditions.second ? "text-green-600" : "text-red-600"}
            >
              * username must start with a letter and cannot have space
            </p>
            <p className={conditions.third ? "text-green-600" : "text-red-600"}>
              * please enter a valid email address
            </p>
            <p
              className={conditions.fourth ? "text-green-600" : "text-red-600"}
            >
              * password must be between 8 - 20 charaters
            </p>
            <p className={conditions.fifth ? "text-green-600" : "text-red-600"}>
              * password must contain at least one Uppercase and lowercase
              letter
            </p>
            <p className={conditions.sixth ? "text-green-600" : "text-red-600"}>
              * password can only include alphabet letters, numbers, one of this
              special charater ~!@#$%^&*-=+?_ and cannot have space
            </p>
            <p
              className={conditions.seventh ? "text-green-600" : "text-red-600"}
            >
              * please confirm your password
            </p>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${disable.class}`}
              disabled={disable.disable}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </span>
              Join
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Alreadly a member?{" "}
          <a
            href="#"
            className="font-medium text-indigo-700 hover:text-indigo-500"
            onClick={() => setSignUp(false)}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
