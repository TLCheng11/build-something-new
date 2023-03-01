import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";

import defaultProfileImg from "../../../icons/defaultProfile.jpeg";

interface Props {
  closeAllForms(): void;
  showImgForm: boolean;
  setShowImgForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileHeader({ closeAllForms, showImgForm, setShowImgForm }: Props) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [imgFile, setImgFile] = useState<File | null>(null);

  function uploadImage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (imgFile) {
      const formData = new FormData();
      formData.append("image", imgFile);
      fetch(`/users_change_image`, {
        method: "PATCH",
        body: formData,
      }).then((res) => {
        if (res.ok) {
          res.json().then(setCurrentUser);
        } else {
          res.json().then((data) => alert(data.errors));
        }
      });
    }
  }

  return (
    <div className="h-1/6 min-h-180 w-full">
      <div className="h-3/4 bg-blue-400 border-b-2 border-black"></div>
      {/* profile picture */}
      <div className="flex flex-col items-center justify-center w-full relative -top-24">
        <div className="h-48 w-48 flex items-center justify-center bg-white rounded-full">
          <img
            className="cursor-pointer h-44 w-44 rounded-full"
            src={currentUser.image_url || defaultProfileImg}
            onClick={() => {
              closeAllForms();
              setShowImgForm((state) => !state);
            }}
          />
        </div>
        {showImgForm && (
          <div className="px-2 py-1 rounded bg-blue-400">
            <form
              onSubmit={(e) => {
                uploadImage(e);
                setShowImgForm(false);
              }}
            >
              <label>Image File:</label>
              <input
                className="mx-1 border-2 rounded-md"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setImgFile(e.target.files[0]);
                  }
                }}
              />
              <button className="mx-1 px-2 border rounded-md" type="submit">
                change
              </button>
              <button
                className="px-2 border rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  setShowImgForm((state) => !state);
                }}
              >
                X
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
