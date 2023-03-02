import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import ProfileEmail from "./ProfileEmail";
import ProfileFirstLastNames from "./ProfileFirstLastNames";
import ProfileUsername from "./ProfileUsername";

interface Props {
  closeAllForms(): void;
  setShowPasswordForm: React.Dispatch<React.SetStateAction<boolean>>;
  showEmailForm: boolean;
  setShowEmailForm: React.Dispatch<React.SetStateAction<boolean>>;
  showNameForm: boolean;
  setShowNameForm: React.Dispatch<React.SetStateAction<boolean>>;
  showIntroForm: boolean;
  setShowIntroForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileBody({
  closeAllForms,
  setShowPasswordForm,
  showEmailForm,
  setShowEmailForm,
  showNameForm,
  setShowNameForm,
  showIntroForm,
  setShowIntroForm,
}: Props) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [introduction, setIntroduction] = useState<string>("");

  useEffect(() => {
    setIntroduction(currentUser.introduction || "");
  }, [showIntroForm]);

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

  return (
    <div className="w-full flex flex-col items-center justify-center text-2xl">
      <ProfileUsername
        closeAllForms={closeAllForms}
        setShowPasswordForm={setShowPasswordForm}
      />
      {/* Form body */}
      <div className=" max-h-2/5screen w-1/3 min-w-480 overflow-auto">
        <ProfileEmail
          closeAllForms={closeAllForms}
          showEmailForm={showEmailForm}
          setShowEmailForm={setShowEmailForm}
          updateProfile={updateProfile}
        />
        <ProfileFirstLastNames
          closeAllForms={closeAllForms}
          showNameForm={showNameForm}
          setShowNameForm={setShowNameForm}
          updateProfile={updateProfile}
        />

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
      </div>
    </div>
  );
}

export default ProfileBody;
