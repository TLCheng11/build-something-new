import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { IProject } from "../../../Interface";

interface Props {
  setshowProjectForm: Dispatch<SetStateAction<boolean>>;
  action: string;
  currentProject?: IProject;
  setrefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  setcurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

function ProjectInfoForm(props: Props) {
  let navigate = useNavigate();
  const {
    setshowProjectForm,
    action,
    currentProject,
    setrefresh,
    setcurrentPage,
  } = props;
  const { currentUser } = useContext(UserContext);
  const [formInput, setformInput] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (currentProject) {
      setformInput({
        title: currentProject.title,
        description: currentProject.description || "",
      });
    }
  }, [currentProject]);

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
    if (action === "post") {
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
    } else if (action === "edit" && currentProject) {
      fetch(`/projects/${currentProject.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formInput,
        }),
      }).then((res) => {
        if (res.ok) {
          res.json().then(() => {
            setshowProjectForm(false);
            if (setcurrentPage && setrefresh) {
              setrefresh((state) => !state);
              setcurrentPage(1);
            }
          });
        } else {
          res.json().then((message) => alert(message.errors));
        }
      });
    }
  }

  return (
    <div
      id="project-info-form"
      className="fixed h-screen w-screen z-20 left-0 flex items-center justify-center bg-black bg-opacity-70"
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
          <h1>{action === "post" ? "Enter " : "Edit "}Project Info:</h1>
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
              {action === "post" ? "Create" : "Edit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectInfoForm;
