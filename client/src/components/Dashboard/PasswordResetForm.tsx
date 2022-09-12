import { useEffect, useState } from "react";

interface Props {
  setshowPasswordForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasswordResetForm({ setshowPasswordForm }: Props) {
  const [formInput, setformInput] = useState({
    current_password: "",
    new_password: "",
    password_confirmation: "",
  });
  const [disable, setDisable] = useState({
    class: "cursor-not-allowed disabled:opacity-25",
    disable: true,
  });
  const [message, setmessage] = useState<string>("");

  const conditions = {
    first: formInput.current_password.length >= 8,
    second: formInput.new_password.match(/^.{8,18}$/g),
    third: formInput.new_password.match(/(?=.*[a-z])(?=.*[A-Z])/g),
    fourth: formInput.new_password.match(/^[\w\d~!@#$%^&*-=+?]+$/g),
    fifth:
      formInput.new_password === formInput.password_confirmation &&
      formInput.new_password.length > 0,
    sixth: formInput.current_password !== formInput.new_password,
    seventh: formInput.current_password.length === 0,
  };

  useEffect(() => {
    if (
      conditions.first &&
      conditions.second &&
      conditions.third &&
      conditions.fourth &&
      conditions.fifth &&
      conditions.sixth
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

  function updatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`/users_new_password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
    }).then((res) => {
      if (res.ok) {
        res.json().then(() => {
          console.log("Password updated");
          setmessage("success");
        });
      } else {
        res.json().then((data) => {
          setmessage("fail");
        });
      }
    });
  }

  return message ? (
    message === "success" ? (
      <div
        className="cursor-pointer bg-gradient-to-r from-white/90 to-green-800/80 rounded-lg flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8"
        onClick={() => setshowPasswordForm(false)}
      >
        <h1 className="text-4xl text-black">Password changed successfully.</h1>
      </div>
    ) : (
      <div
        className="cursor-pointer bg-gradient-to-r from-white/90 to-red-800/80 rounded-lg flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8"
        onClick={() => setmessage("")}
      >
        <h1 className="text-4xl text-white">Wrong Password</h1>
      </div>
    )
  ) : (
    <div className="bg-gradient-to-r from-white/90 to-blue-500/80 rounded-lg flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-end">
          <div
            className="cursor-pointer text-xl text-slate-600 hover:text-red-500"
            onClick={() => setshowPasswordForm(false)}
          >
            X
          </div>
        </div>
        <form className="space-y-6" onSubmit={updatePassword}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="current_password" className="sr-only">
                Current Password:
              </label>
              <input
                id="current_password"
                name="current_password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Current Password"
                value={formInput.current_password}
                onChange={onFormChange}
              />
            </div>

            <div>
              <label htmlFor="new_password" className="sr-only">
                New Password:
              </label>
              <input
                id="new_password"
                name="new_password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={formInput.new_password}
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
            {!conditions.seventh
              ? !conditions.sixth && (
                  <div className="flex justify-center">
                    <p className="text-red-600">
                      new password cannot be same as current password
                    </p>
                  </div>
                )
              : null}

            <p className={conditions.first ? "text-green-600" : "text-red-600"}>
              * please enter current password
            </p>
            <p
              className={conditions.second ? "text-green-600" : "text-red-600"}
            >
              * password must be between 8 - 20 charaters
            </p>
            <p className={conditions.third ? "text-green-600" : "text-red-600"}>
              * password must contain at least one Uppercase and lowercase
              letter
            </p>
            <p
              className={conditions.fourth ? "text-green-600" : "text-red-600"}
            >
              * password can only include alphabet letters, numbers, one of this
              special charater ~!@#$%^&*-=+?_ and cannot have space
            </p>
            <p className={conditions.fifth ? "text-green-600" : "text-red-600"}>
              * please confirm your password
            </p>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${disable.class}`}
              disabled={disable.disable}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetForm;
