import { IProject } from "../../Interface";
import ReactStars from "react-stars";
import { useState } from "react";
import CommentForm from "./CommentForm";

interface Props {
  project: IProject;
}

function Details({ project }: Props) {
  console.log(project);
  const [addComment, setaddComment] = useState<boolean>(false);

  return (
    <div
      id="reviews"
      className="flex justify-center h-fit w-1/3 m-2 overflow-x-hidden"
    >
      <div className="h-fit w-full p-3 rounded-3xl border bg-white">
        <div>
          <h1 className="text-3xl">{project.title}</h1>
          <div className="flex">
            <p className="mr-2">Created by:</p>
            <p>{project.creator}</p>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Overall Rating:</p>
            <ReactStars count={5} size={24} color2={"#ffd700"} edit={false} />
          </div>
          <div>
            <button
              className="border"
              onClick={() => setaddComment((state) => !state)}
            >
              Comment
            </button>
          </div>
        </div>
        {addComment && (
          <CommentForm
            action="comment"
            setaddComment={setaddComment}
            projectId={project.id}
          />
        )}
      </div>
    </div>
  );
}

export default Details;
