import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import AdminUpload from "./AdminUpload";
import PasswordResetForm from "./PasswordResetForm";
import ProfileBody from "./ProfileBody/ProfileBody";
import ProfileHeader from "./ProfileHeader";

function Profile() {
  const { currentUser } = useContext(UserContext);
  const [showImgForm, setShowImgForm] = useState<boolean>(false);
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);
  const [showNameForm, setShowNameForm] = useState<boolean>(false);
  const [showIntroForm, setShowIntroForm] = useState<boolean>(false);

  const closeAllForms = useCallback(() => {
    setShowImgForm(false);
    setShowEmailForm(false);
    setShowNameForm(false);
    setShowIntroForm(false);
    setShowPasswordForm(false);
  }, []);

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
      <ProfileBody
        closeAllForms={closeAllForms}
        setShowPasswordForm={setShowPasswordForm}
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
        showNameForm={showNameForm}
        setShowNameForm={setShowNameForm}
        showIntroForm={showIntroForm}
        setShowIntroForm={setShowIntroForm}
      />

      {/* Upload area */}
      {/* only for user tony */}
      {(currentUser.username === "tony" ||
        currentUser.username === "admin") && <AdminUpload />}
    </div>
  );
}

export default Profile;
