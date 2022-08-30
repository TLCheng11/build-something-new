import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  currentUser: {
    id?: number | undefined;
    email?: string | undefined;
    username?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    dob?: Date | undefined;
    profile_img?: string | undefined;
    introduction?: string | undefined;
    is_login?: boolean | undefined;
  };
}

interface Props {
  setshowProjectForm: Dispatch<SetStateAction<boolean>>;
}

function ProjectInfoForm(props: Props) {
  const { currentUser, setshowProjectForm } = props;
  const [formInput, setformInput] = useState({
    title: "",
    description: "",
  });

  function onFormChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const newInput = {
      ...formInput,
      [e.target.name]: e.target.value,
    };
    setformInput(newInput);
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formInput,
        created_by: currentUser.id,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setshowProjectForm(false);
        });
      } else {
        res.json().then((message) => alert(message.errors));
      }
    });
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
            <input
              className="block text-black"
              name="title"
              value={formInput.title}
              onChange={onFormChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              className="block text-black"
              name="description"
              value={formInput.description}
              onChange={onFormChange}
            />
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
