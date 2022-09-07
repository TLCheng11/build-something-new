import { IComment, IProject } from "../../Interface";
import ReactStars from "react-stars";
import { useContext, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { UserContext } from "../../contexts/UserContext";
import useDownload from "../../downloader/useDownload";

interface Props {
  project: IProject;
}

function Details({ project }: Props) {
  const { currentUser } = useContext(UserContext);
  const [refresh, setrefresh] = useState<boolean>(false);
  const [addComment, setaddComment] = useState<boolean>(false);
  const [comments, setcomments] = useState<IComment[]>([]);
  const [overallRating, setoverallRating] = useState<{
    rating: number;
    count: number;
  }>({ rating: 0, count: 0 });

  //testing downloader
  const [handleZip] = useDownload();
  const [downloadType, setdownloadType] = useState<string>("jsx");

  const showComments = comments.map((comment) => (
    <Comment key={comment.id} setrefresh={setrefresh} comment={comment} />
  ));

  useEffect(() => {
    if (project.id) {
      fetch(`/projects/${project.id}/comments`)
        .then((res) => res.json())
        .then(setcomments)
        .catch(console.error);

      fetch(`/projects_ratings/${project.id}`)
        .then((res) => res.json())
        .then(setoverallRating)
        .catch(console.error);
    }
  }, [refresh, project]);

  function downloadModel() {
    fetch(`/projects_download/${project.id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => handleZip(project.title, data, downloadType));
      } else {
        res.json().then((data) => alert(data.error));
      }
    });
  }

  return (
    <div id="reviews" className="flex justify-center h-full w-1/3 my-2 mx-5">
      <div className="h-full w-full p-3 rounded-3xl border bg-white overflow-auto">
        {/* radio buttons for download */}
        <div className="flex items-center justify-end">
          <div>
            <input
              id="radio-jsx"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              name="radio-download"
              value="jsx"
              checked={downloadType === "jsx"}
              onChange={(e) => setdownloadType(e.target.value)}
            />
            <label
              htmlFor="radio-jsx"
              className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-800"
            >
              Javascript
            </label>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              id="radio-tsx"
              type="radio"
              name="radio-download"
              value="tsx"
              checked={downloadType === "tsx"}
              onChange={(e) => setdownloadType(e.target.value)}
            />
            <label
              htmlFor="radio-tsx"
              className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-800"
            >
              Typescript
            </label>
          </div>
          <button
            className="px-1 border rounded-md"
            onClick={() => downloadModel()}
          >
            Download
          </button>
        </div>

        <div className="mb-5">
          <h1 className="text-3xl">{project.title}</h1>
          <div className="flex">
            <p className="mr-2">Created by:</p>
            <p>{project.creator}</p>
          </div>
          <div className="flex items-center">
            <p>Overall Rating:</p>
            <div className="flex items-center">
              <ReactStars
                className="px-2 pb-1"
                count={5}
                size={24}
                color2={"#ffd700"}
                edit={false}
                value={overallRating.rating}
              />
              {overallRating.count > 0 ? (
                <p>
                  {overallRating.rating?.toFixed(2)} / 5 ({overallRating.count}{" "}
                  ratings)
                </p>
              ) : (
                <p className="ml-2">Not Rated Yet.</p>
              )}
            </div>
          </div>
          {project.description && (
            <div>
              <p>Description:</p>
              <p className="px-2">{project.description}</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between">
            <h1>Comments:</h1>
            {currentUser.id !== project.created_by && (
              <div>
                <button
                  className="px-1 border"
                  onClick={() => setaddComment((state) => !state)}
                >
                  Add a Comment
                </button>
              </div>
            )}
          </div>
          {addComment && (
            <CommentForm
              setrefresh={setrefresh}
              action="post"
              setaddComment={setaddComment}
              id={project.id}
            />
          )}
          {showComments.length > 0 ? showComments : "No Comments"}
        </div>
      </div>
    </div>
  );
}

export default Details;
