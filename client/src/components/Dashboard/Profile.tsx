import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import defaultProfileImg from "../../icons/defaultProfile.jpeg";

function Profile() {
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [showImgForm, setshowImgForm] = useState<boolean>(false);
  const [showEmailForm, setshowEmailForm] = useState<boolean>(false);
  const [profile_img, setprofile_img] = useState<string>("");
  const [email, setemail] = useState<string>("");

  function updateProfileImg(e: React.FormEvent<HTMLFormElement>, input = {}) {
    e.preventDefault();
    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then(setcurrentUser);
  }

  return (
    <div className="h-full w-full">
      <div className="h-1/6 min-h-180 w-full">
        <div className="h-3/4 bg-blue-400 border-b-2 border-black"></div>
        <div className="flex flex-col items-center justify-center w-full relative -top-24">
          <div className="h-48 w-48 flex items-center justify-center bg-white rounded-full">
            <img
              className="cursor-pointer h-44 w-44 rounded-full"
              src={currentUser.profile_img || defaultProfileImg}
              onClick={() => setshowImgForm((state) => !state)}
            />
          </div>
          {showImgForm && (
            <div className="px-2 py-1 rounded bg-blue-300">
              <form onSubmit={(e) => updateProfileImg(e, { profile_img })}>
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
      <div className="w-full flex flex-col items-center justify-center text-2xl">
        <div className="mt-4 mb-8">
          <h1 className="text-5xl">{currentUser.username}</h1>
        </div>
        <div className="w-1/3 min-w-460">
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
            <div className="px-2 py-1 rounded text-xl bg-blue-300">
              <form onSubmit={(e) => updateProfileImg(e, { email })}>
                <label>New email:</label>
                <input
                  className="mx-1 border-2 rounded-md"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
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
            </div>
          )}
          <div className="m-2 flex justify-between">
            <p>
              First Name:{" "}
              {currentUser.first_name || (
                <span className="text-gray-400">Enter Firstname</span>
              )}
            </p>
            <button className="px-2 border border-black rounded-lg">
              edit
            </button>
          </div>
          <div className="m-2 flex">
            <p>
              Last Name:{" "}
              {currentUser.last_name || (
                <span className="text-gray-400">Enter Lastname</span>
              )}
            </p>
          </div>
          <div className="mt-10 mx-2 flex justify-between">
            <p>Intoduction:</p>
            <button className="px-2 border border-black rounded-lg">
              edit
            </button>
          </div>
          <div className="m-2 flex">
            <p>
              {currentUser.introduction || (
                <span className="text-gray-400">Add your introduction</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
