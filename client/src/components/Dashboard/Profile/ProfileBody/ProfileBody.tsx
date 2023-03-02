import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import ProfileEmail from "./ProfileEmail";
import ProfileFirstLastNames from "./ProfileFirstLastNames";
import ProfileIntroduction from "./ProfileIntroduction";
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
        <ProfileIntroduction
          closeAllForms={closeAllForms}
          showIntroForm={showIntroForm}
          setShowIntroForm={setShowIntroForm}
          updateProfile={updateProfile}
        />
      </div>
    </div>
  );
}

export default ProfileBody;
