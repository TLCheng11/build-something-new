import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setshowProjectForm: Dispatch<SetStateAction<boolean>>;
}

function ProjectInfoForm(props: Props) {
  const { setshowProjectForm } = props;
  const [formInput, setformInput] = useState({
    title: "",
    description: "",
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setshowProjectForm(false);
  }

  return (
    <div
      id="project-info-form"
      className="fixed h-full w-full flex items-center justify-center bg-black opacity-70"
    >
      <div>
        <div>
          <h1>Enter Project Info:</h1>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input className="block" name="title" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea className="block" name="description" />
          </div>
          <button type="submit" className="border">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectInfoForm;
