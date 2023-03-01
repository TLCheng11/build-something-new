import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";

interface Props {
  closeAllForms(): void;
  setShowPasswordForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileUsername({ closeAllForms, setShowPasswordForm }: Props) {
  const { currentUser } = useContext(UserContext);

  return (
    <>
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
    </>
  );
}

export default ProfileUsername;
