import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface Props {
  setshowProjectForm: Dispatch<SetStateAction<boolean>>;
}

function ProjectInfoForm(props: Props) {
  let navigate = useNavigate();
  const { setshowProjectForm } = props;
  const { currentUser } = useContext(UserContext);
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
    fetch("/projects", {
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
          navigate(`/project-design/${data.id}`);
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
      className="fixed h-full w-full z-20 flex items-center justify-center bg-black bg-opacity-70"
    >
      <div className="border p-3">
        <div className="flex justify-end">
          <p
            className="cursor-pointer hover:text-red-500"
            onClick={() => setshowProjectForm(false)}
          >
            X
          </p>
        </div>
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
              className="block text-black w-full"
              name="description"
              maxLength={255}
              value={formInput.description}
              onChange={onFormChange}
            />
          </div>
          <div className="flex justify-center pt-2">
            <button type="submit" className="border">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectInfoForm;
