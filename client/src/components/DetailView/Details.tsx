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
    <div id="reviews" className="flex justify-center h-fit w-full">
      <div className="h-fit w-4/5 p-3 rounded-3xl border bg-white">
        <div>
          <h1 className="text-3xl">{project.title}</h1>
          <p>{project.creator}</p>
          <div className="flex items-center">
            <p className="mr-2">Rating:</p>
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
        {addComment && <CommentForm />}
      </div>
    </div>
  );
}

export default Details;
