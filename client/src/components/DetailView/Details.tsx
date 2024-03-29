import { IComment, IProject } from "../../Interface";
import ReactStars from "react-stars";
import { useContext, useEffect, useRef, useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { UserContext } from "../../contexts/UserContext";
import useDownload from "../../downloader/useDownload";
import { NavLink } from "react-router-dom";

interface Props {
  project: IProject;
}

function Details({ project }: Props) {
  const favoredRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useContext(UserContext);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [favored, setFavored] = useState<boolean>(false);
  const [addComment, setAddComment] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [overallRating, setOverallRating] = useState<{
    rating: number;
    count: number;
  }>({ rating: 0, count: 0 });

  //testing downloader
  const [handleZip] = useDownload();
  const [downloadType, setDownloadType] = useState<string>("jsx");
  const [withPhysic, setWithPhysic] = useState<boolean>(false);

  const showComments = comments.map((comment) => (
    <Comment key={comment.id} setRefresh={setRefresh} comment={comment} />
  ));

  useEffect(() => {
    if (project.id) {
      if (currentUser.id) {
        fetch(`/projects/${project.id}/comments`)
          .then((res) => res.json())
          .then(setComments)
          .catch(console.error);
      }

      fetch(`/projects_ratings/${project.id}`)
        .then((res) => res.json())
        .then(setOverallRating)
        .catch(console.error);
    }

    setFavored(project.favored || false);
  }, [refresh, project]);

  // to update favered icon status
  useEffect(() => {
    if (favoredRef.current) {
      const target = favoredRef.current;
      if (favored) {
        target.classList.add("liked");
      } else if (target.classList.contains("liked")) {
        target.classList.remove("liked");
      }
    }
  }, [favored]);

  function downloadModel() {
    fetch(`/projects_download/${project.id}`).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((data) =>
            handleZip(project.title, data, downloadType, withPhysic)
          );
      } else {
        res.json().then((data) => alert(data.error));
      }
    });
  }

  function toggleLike(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    fetch(`/user_projects_set_favor/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favored: !favored }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => setFavored(data.favored));
      } else {
        res.json().then((data) => alert(data.error));
      }
    });
  }

  return (
    <div id="reviews" className="flex justify-center h-full my-2 mx-5 md:w-1/3">
      <div className="h-full w-full p-3 rounded-3xl border bg-white overflow-auto">
        {currentUser.id && (
          <div>
            <div id="detail-like-btn" className="flex justify-between py-1">
              {/* like button */}
              {currentUser.id !== project.created_by ? (
                <div
                  ref={favoredRef}
                  className="heart-like-button"
                  onClick={(e) => toggleLike(e)}
                ></div>
              ) : (
                <div></div>
              )}
              <NavLink to={`/project-test-physic/${project.id}`}>
                <button
                  id="test-physic-btn"
                  className="border rounded-md border-black hover:bg-blue-400 min-w-fit px-2 whitespace-nowrap"
                >
                  Test Physic
                </button>
              </NavLink>
            </div>
            <div
              id="download-options"
              className="flex justify-between py-1 my-2 md:justify-start"
            >
              {/* radio buttons for download */}
              <div id="file-type-options" className="flex">
                <div className="flex items-center">
                  <input
                    id="radio-jsx"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="radio"
                    name="radio-download"
                    value="jsx"
                    checked={downloadType === "jsx"}
                    onChange={(e) => setDownloadType(e.target.value)}
                  />
                  <label
                    htmlFor="radio-jsx"
                    className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    .jsx
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    id="radio-tsx"
                    type="radio"
                    name="radio-download"
                    value="tsx"
                    checked={downloadType === "tsx"}
                    onChange={(e) => setDownloadType(e.target.value)}
                  />
                  <label
                    htmlFor="radio-tsx"
                    className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                  >
                    .tsx
                  </label>
                </div>
              </div>
              {/* with Physic option */}
              <div className="flex items-center mr-2">
                <label>| </label>
                <input
                  className="h-4 w-4 mx-2"
                  type="checkbox"
                  checked={withPhysic}
                  onChange={(e) => setWithPhysic(e.target.checked)}
                />
                <label>With Physic</label>
              </div>
              <button
                className="design-btn min-w-fit px-1 "
                onClick={() => downloadModel()}
              >
                Download
              </button>
            </div>
          </div>
        )}

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

        {currentUser.id ? (
          <div>
            <div className="flex justify-between">
              <h1>Comments:</h1>
              {currentUser.id !== project.created_by && (
                <div>
                  <button
                    className="px-1 border"
                    onClick={() => setAddComment((state) => !state)}
                  >
                    Add a Comment
                  </button>
                </div>
              )}
            </div>
            {addComment && (
              <CommentForm
                setRefresh={setRefresh}
                action="post"
                setAddComment={setAddComment}
                id={project.id}
              />
            )}
            {showComments.length > 0 ? showComments : "No Comments"}
          </div>
        ) : (
          <div>Please login to see comments.</div>
        )}
      </div>
    </div>
  );
}

export default Details;
