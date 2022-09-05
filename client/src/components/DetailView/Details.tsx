import { IComment, IProject } from "../../Interface";
import ReactStars from "react-stars";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

interface Props {
  project: IProject;
}

function Details({ project }: Props) {
  const [refresh, setrefresh] = useState<boolean>(false);
  const [addComment, setaddComment] = useState<boolean>(false);
  const [comments, setcomments] = useState<IComment[]>([]);

  const showComments = comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  useEffect(() => {
    if (project.id) {
      fetch(`/projects/${project.id}/comments`)
        .then((res) => res.json())
        .then(setcomments)
        .catch(console.error);
    }
  }, [refresh, project]);

  return (
    <div id="reviews" className="flex justify-center h-full w-1/3 m-2">
      <div className="h-full w-full p-3 rounded-3xl border bg-white overflow-auto">
        <div>
          <h1 className="text-3xl">{project.title}</h1>
          <div className="flex">
            <p className="mr-2">Created by:</p>
            <p>{project.creator}</p>
          </div>
          <div className="flex items-center">
            <p>Overall Rating:</p>
            <ReactStars
              className="px-2 pb-1"
              count={5}
              size={24}
              color2={"#ffd700"}
              edit={false}
              value={project.overall_rating}
            />
            <p>
              {project.overall_rating?.toFixed(2)} / 5 ({project.rating_count}{" "}
              ratings)
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <h1>Comments:</h1>
            <div>
              <button
                className="px-1 border"
                onClick={() => setaddComment((state) => !state)}
              >
                Add a Comment
              </button>
            </div>
          </div>
          {addComment && (
            <CommentForm
              setrefresh={setrefresh}
              action="comment"
              setaddComment={setaddComment}
              projectId={project.id}
            />
          )}
          {showComments}
        </div>
      </div>
    </div>
  );
}

export default Details;
