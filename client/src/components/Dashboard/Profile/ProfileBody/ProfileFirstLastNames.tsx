import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";

interface Props {
  closeAllForms(): void;
  showNameForm: boolean;
  setShowNameForm: React.Dispatch<React.SetStateAction<boolean>>;
  updateProfile(e: React.FormEvent<HTMLFormElement>, input?: {}): void;
}

function ProfileFirstLastNames({
  closeAllForms,
  showNameForm,
  setShowNameForm,
  updateProfile,
}: Props) {
  const { currentUser } = useContext(UserContext);
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");

  useEffect(() => {
    setFirst_name("");
    setLast_name("");
  }, [showNameForm]);

  return (
    <>
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
    </>
  );
}

export default ProfileFirstLastNames;
