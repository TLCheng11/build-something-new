import { useState } from "react";
import ReactStars from "react-stars";

interface Props {
  action: string;
  setaddComment: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
}

function CommentForm(props: Props) {
  const { action, setaddComment, projectId } = props;
  const [rating, setrating] = useState<number>(0);
  const [title, settitle] = useState<string>("");
  const [comment, setcomment] = useState<string>("");

  function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (action === "comment") {
      fetch(`/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project_id: projectId, title, comment, rating }),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then(() => setaddComment((state) => !state));
          } else {
            res
              .json()
              .then(() =>
                alert("You can only leave one comment for each project")
              );
          }
        })
        .catch(console.error);
    }
  }

  return (
    <div className="max-w-lg rounded-lg shadow-md shadow-blue-600/50">
      <form action="" className="w-full p-4" onSubmit={handleCommentSubmit}>
        <div className="mb-2">
          <label htmlFor="title" className="text-lg text-gray-600">
            Add a Comment:
          </label>
          <input
            className="w-full h-7 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="title"
            placeholder="Title"
            maxLength={255}
            required
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <textarea
            className="w-full h-20 mt-2 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment"
            placeholder=""
            maxLength={255}
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center">
          <p className="mr-2">Rate: </p>
          <ReactStars
            count={5}
            size={24}
            color2={"#ffd700"}
            value={rating}
            onChange={setrating}
          />
        </div>
        <div>
          <button
            className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
            type="submit"
          >
            Comment
          </button>
          <button
            className="px-3 py-2 mx-2 text-sm text-blue-600 border border-blue-500 rounded"
            onClick={(e) => {
              e.preventDefault();
              setaddComment((state) => !state);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
