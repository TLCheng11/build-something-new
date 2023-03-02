import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";

interface Props {
  closeAllForms(): void;
  showEmailForm: boolean;
  setShowEmailForm: React.Dispatch<React.SetStateAction<boolean>>;
  updateProfile(e: React.FormEvent<HTMLFormElement>, input?: {}): void;
}

function ProfileEmail({
  closeAllForms,
  showEmailForm,
  setShowEmailForm,
  updateProfile,
}: Props) {
  const { currentUser } = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);

  useEffect(() => {
    setEmail("");
    setInvalidEmail(false);
  }, [showEmailForm]);

  function validateEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);
  }

  return (
    <>
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
    </>
  );
}

export default ProfileEmail;
