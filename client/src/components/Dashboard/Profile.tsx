import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import defaultProfileImg from "../../icons/defaultProfile.jpeg";

function Profile() {
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [showImgForm, setshowImgForm] = useState<boolean>(false);
  const [profile_img, setprofile_img] = useState<string>("");
  const [showEmailForm, setshowEmailForm] = useState<boolean>(false);
  const [email, setemail] = useState<string>("");
  const [invalidEmail, setinvalidEmail] = useState<boolean>(false);
  const [showNameForm, setshowNameForm] = useState<boolean>(false);
  const [first_name, setfirst_name] = useState<string>("");
  const [last_name, setlast_name] = useState<string>("");
  const [showIntroForm, setshowIntroForm] = useState<boolean>(false);
  const [introduction, setintroduction] = useState<string>("");

  function updateProfileImg(e: React.FormEvent<HTMLFormElement>, input = {}) {
    e.preventDefault();
    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then((res) => {
      if (res.ok) {
        res.json().then(setcurrentUser);
      } else {
        res.json().then((data) => alert(data.errors));
      }
    });
  }

  function validateEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);
  }

  useEffect(() => {
    setprofile_img("");
  }, [showImgForm]);

  useEffect(() => {
    setemail("");
    setinvalidEmail(false);
  }, [showEmailForm]);

  useEffect(() => {
    setfirst_name("");
    setlast_name("");
  }, [showNameForm]);

  useEffect(() => {
    setintroduction(currentUser.introduction || "");
  }, [showIntroForm]);

  return (
    <div className="h-full w-full">
      {/* profile header */}
      <div className="h-1/6 min-h-180 w-full">
        <div className="h-3/4 bg-blue-400 border-b-2 border-black"></div>
        {/* profile picture */}
        <div className="flex flex-col items-center justify-center w-full relative -top-24">
          <div className="h-48 w-48 flex items-center justify-center bg-white rounded-full">
            <img
              className="cursor-pointer h-44 w-44 rounded-full"
              src={currentUser.profile_img || defaultProfileImg}
              onClick={() => setshowImgForm((state) => !state)}
            />
          </div>
          {showImgForm && (
            <div className="px-2 py-1 rounded bg-blue-400">
              <form
                onSubmit={(e) => {
                  updateProfileImg(e, { profile_img });
                  setshowImgForm(false);
                }}
              >
                <label>Image url:</label>
                <input
                  className="mx-1 border-2 rounded-md"
                  value={profile_img}
                  onChange={(e) => setprofile_img(e.target.value)}
                />
                <button className="mx-1 px-2 border rounded-md" type="submit">
                  change
                </button>
                <button
                  className="px-2 border rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setshowImgForm((state) => !state);
                  }}
                >
                  X
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="h-1/10"></div>
      {/* profile body */}
      <div className="w-full flex flex-col items-center justify-center text-2xl">
        <div className="mt-4 mb-8">
          <h1 className="text-5xl">{currentUser.username}</h1>
        </div>
        <div className=" max-h-1/2screen w-1/3 min-w-480 overflow-auto">
          {/* email */}
          <div className="m-2 flex justify-between">
            <p>Email: {currentUser.email}</p>
            <button
              className="px-2 border border-black rounded-lg"
              onClick={() => setshowEmailForm((state) => !state)}
            >
              edit
            </button>
          </div>
          {showEmailForm && (
            <div className="px-2 py-1 flex justify-center rounded text-xl bg-blue-400">
              <form
                onSubmit={(e) => {
                  if (validateEmail(e)) {
                    updateProfileImg(e, { email });
                    setshowEmailForm(false);
                  } else {
                    setinvalidEmail(true);
                  }
                }}
              >
                <label>New email:</label>
                <input
                  className="mx-1 border-2 rounded-md"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                    setinvalidEmail(false);
                  }}
                />
                <button className="mx-1 px-2 border rounded-md" type="submit">
                  update
                </button>
                <button
                  className="px-2 border rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setshowEmailForm((state) => !state);
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
            <p>
              First name:{" "}
              {currentUser.first_name || (
                <span className="text-gray-400">Enter First_name</span>
              )}
            </p>
            <button
              className="px-2 border border-black rounded-lg"
              onClick={() => setshowNameForm((state) => !state)}
            >
              edit
            </button>
          </div>
          <div className="m-2 flex">
            <p>
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
                  updateProfileImg(e, { first_name, last_name });
                  setshowNameForm(false);
                }}
              >
                <div className="flex">
                  <div className="w-150 flex justify-end">
                    <label>First name:</label>
                  </div>
                  <input
                    className="mx-1 border-2 rounded-md"
                    value={first_name}
                    onChange={(e) => setfirst_name(e.target.value)}
                  />
                </div>
                <div className="flex">
                  <div className="w-150 flex justify-end">
                    <label>Last name:</label>
                  </div>
                  <input
                    className="mx-1 border-2 rounded-md"
                    value={last_name}
                    onChange={(e) => setlast_name(e.target.value)}
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
                      setshowNameForm((state) => !state);
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
              className="px-2 border border-black rounded-lg"
              onClick={() => setshowIntroForm((state) => !state)}
            >
              edit
            </button>
          </div>

          {showIntroForm ? (
            <div className="px-2 py-1 rounded bg-blue-400">
              <form
                onSubmit={(e) => {
                  updateProfileImg(e, { introduction });
                  setshowIntroForm(false);
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
                    onChange={(e) => setintroduction(e.target.value)}
                  />
                </div>
                <button className="mx-1 px-2 border rounded-md" type="submit">
                  update
                </button>
                <button
                  className="px-2 border rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    setshowIntroForm((state) => !state);
                  }}
                >
                  X
                </button>
              </form>
            </div>
          ) : (
            <div className="m-2 flex">
              <p>
                {currentUser.introduction || (
                  <span className="text-gray-400">Add your introduction</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
