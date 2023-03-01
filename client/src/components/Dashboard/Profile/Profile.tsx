import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import AdminUpload from "./AdminUpload";
import PasswordResetForm from "./PasswordResetForm";
import ProfileHeader from "./ProfileHeader";

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showImgForm, setShowImgForm] = useState<boolean>(false);
  // const [profile_img, setprofile_img] = useState<string>("");
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [showNameForm, setShowNameForm] = useState<boolean>(false);
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [showIntroForm, setShowIntroForm] = useState<boolean>(false);
  const [introduction, setIntroduction] = useState<string>("");

  function updateProfile(e: React.FormEvent<HTMLFormElement>, input = {}) {
    e.preventDefault();
    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then((res) => {
      if (res.ok) {
        res.json().then(setCurrentUser);
      } else {
        res.json().then((data) => alert(data.errors));
      }
    });
  }

  function closeAllForms() {
    setShowImgForm(false);
    setShowEmailForm(false);
    setShowNameForm(false);
    setShowIntroForm(false);
    setShowPasswordForm(false);
  }

  function validateEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);
  }

  // useEffect(() => {
  //   setprofile_img("");
  // }, [showImgForm]);

  useEffect(() => {
    setEmail("");
    setInvalidEmail(false);
  }, [showEmailForm]);

  useEffect(() => {
    setFirst_name("");
    setLast_name("");
  }, [showNameForm]);

  useEffect(() => {
    setIntroduction(currentUser.introduction || "");
  }, [showIntroForm]);

  return (
    <div className="h-full md:w-4/5">
      {/* password form */}
      {showPasswordForm && (
        <div className="fixed h-full w-4/5 z-30 flex justify-center items-center bg-gray-600 bg-opacity-70">
          <PasswordResetForm setShowPasswordForm={setShowPasswordForm} />
        </div>
      )}

      {/* profile header */}
      <ProfileHeader
        closeAllForms={closeAllForms}
        showImgForm={showImgForm}
        setShowImgForm={setShowImgForm}
      />
      <div className="h-1/10"></div>

      {/* profile body */}
      <div className="w-full flex flex-col items-center justify-center text-2xl">
        <div className="mt-4 mb-4">
          <h1 className="text-5xl">{currentUser.username}</h1>
        </div>
        <button
          className="design-btn min-w-fit px-2"
          onClick={() => {
            closeAllForms();
            setShowPasswordForm(true);
          }}
        >
          Change Password
        </button>
        <div className=" max-h-2/5screen w-1/3 min-w-480 overflow-auto">
          {/* email */}
          <div className="m-2 flex justify-between">
            <p className="overflow-hidden">Email: {currentUser.email}</p>
            <button
              className="design-btn px-2"
              onClick={() => {
                closeAllForms();
                setShowEmailForm((state) => !state);
              }}
            >
              Edit
            </button>
          </div>
          {showEmailForm && (
            <div className="px-2 py-1 rounded text-xl bg-blue-400">
              <form
                onSubmit={(e) => {
                  if (validateEmail(e)) {
                    updateProfile(e, { email });
                    setShowEmailForm(false);
                  } else {
                    setInvalidEmail(true);
                  }
                }}
              >
                <label>New email:</label>
                <input
                  className="mx-1 border-2 rounded-md"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setInvalidEmail(false);
                  }}
                />
                <button className="mx-1 px-2 border rounded-md" type="submit">
                  update
                </button>
                <button
                  className="px-2 border rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowEmailForm((state) => !state);
                  }}
                >
                  X
                </button>
              </form>
              {invalidEmail && (
                <div className="pl-28 text-red-500">Email is invalid!</div>
              )}
            </div>
          )}
          {/* first and last_name */}
          <div className="m-2 flex justify-between">
            <p className="overflow-hidden">
              First name:{" "}
              {currentUser.first_name || (
                <span className="text-gray-400">Enter First_name</span>
              )}
            </p>
            <button
              className="design-btn px-2"
              onClick={() => {
                closeAllForms();
                setShowNameForm((state) => !state);
              }}
            >
              Edit
            </button>
          </div>
          <div className="m-2 flex">
            <p className="overflow-hidden">
              Last name:{" "}
              {currentUser.last_name || (
                <span className="text-gray-400">Enter Last_name</span>
              )}
            </p>
          </div>
          {showNameForm && (
            <div className="px-2 py-1 rounded bg-blue-400">
              <form
                onSubmit={(e) => {
                  updateProfile(e, { first_name, last_name });
                  setShowNameForm(false);
                }}
              >
                <div className="flex">
                  <div className="w-150 flex justify-end">
                    <label>First name:</label>
                  </div>
                  <input
                    className="mx-1 border-2 rounded-md"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                  />
                </div>
                <div className="flex">
                  <div className="w-150 flex justify-end">
                    <label>Last name:</label>
                  </div>
                  <input
                    className="mx-1 border-2 rounded-md"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                  />
                </div>
                <div className="mt-2 flex justify-center">
                  <button className="mx-1 px-2 border rounded-md" type="submit">
                    update
                  </button>
                  <button
                    className="px-2 border rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowNameForm((state) => !state);
                    }}
                  >
                    X
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* Introduction */}
          <div className="mt-10 mx-2 flex justify-between">
            <p>Introduction:</p>
            <button
              className="design-btn px-2"
              onClick={() => {
                closeAllForms();
                setShowIntroForm((state) => !state);
              }}
            >
              Edit
            </button>
          </div>

          {showIntroForm ? (
            <div className="px-2 py-1 rounded bg-blue-400">
              <form
                onSubmit={(e) => {
                  updateProfile(e, { introduction });
                  setShowIntroForm(false);
                }}
              >
                <div>
                  <label>Introduction:</label>
                </div>
                <div>
                  <textarea
                    maxLength={255}
                    className="w-full border-2 rounded-md"
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                  />
                </div>
                <button className="mx-1 px-2 border rounded-md" type="submit">
                  update
                </button>
                <button
                  className="px-2 border rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowIntroForm((state) => !state);
                  }}
                >
                  X
                </button>
              </form>
            </div>
          ) : (
            <div className="m-2 flex">
              <p className="overflow-x-hidden">
                {currentUser.introduction || (
                  <span className="text-gray-400">Add your introduction</span>
                )}
              </p>
            </div>
          )}

          {/* Upload area */}
          {/* only for user tony */}

          {(currentUser.username === "tony" ||
            currentUser.username === "admin") && <AdminUpload />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
