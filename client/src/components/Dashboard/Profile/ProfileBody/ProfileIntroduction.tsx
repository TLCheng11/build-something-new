import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";

interface Props {
  closeAllForms(): void;
  showIntroForm: boolean;
  setShowIntroForm: React.Dispatch<React.SetStateAction<boolean>>;
  updateProfile(e: React.FormEvent<HTMLFormElement>, input?: {}): void;
}

function ProfileIntroduction({
  closeAllForms,
  showIntroForm,
  setShowIntroForm,
  updateProfile,
}: Props) {
  const { currentUser } = useContext(UserContext);
  const [introduction, setIntroduction] = useState<string>("");

  useEffect(() => {
    setIntroduction(currentUser.introduction || "");
  }, [showIntroForm]);

  return (
    <>
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
    </>
  );
}

export default ProfileIntroduction;
