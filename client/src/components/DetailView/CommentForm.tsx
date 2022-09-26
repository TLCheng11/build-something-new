import { useState } from "react";
import ReactStars from "react-stars";
import { IComment } from "../../Interface";

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  action: string;
  setAddComment: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  currentComment?: IComment;
}

function CommentForm(props: Props) {
  const { setRefresh, action, setAddComment, id, currentComment } = props;
  const [rating, setRating] = useState<number>(currentComment?.rating || 0);
  const [title, setTitle] = useState<string>(currentComment?.title || "");
  const [comment, setComment] = useState<string>(currentComment?.comment || "");

  function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (action === "post") {
      fetch(`/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project_id: id, title, comment, rating }),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then(() => {
              setAddComment((state) => !state);
              setRefresh((state) => !state);
            });
          } else {
            res
              .json()
              .then(() =>
                alert("You can only leave one comment for each project")
              );
          }
        })
        .catch(console.error);
    } else if (action == "edit" && currentComment) {
      fetch(`/comments/${currentComment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, comment, rating }),
      }).then((res) => {
        if (res.ok) {
          res.json().then(() => {
            setAddComment((state) => !state);
            setRefresh((state) => !state);
          });
        } else {
          res.json().then((data) => alert(data.error));
        }
      });
    }
  }

  return (
    <div className="max-w-lg rounded-lg shadow-md shadow-blue-600/50">
      <form className="w-full p-4" onSubmit={handleCommentSubmit}>
        <div className="mb-2">
          <label htmlFor="title" className="text-lg text-gray-600">
            {action === "post" ? "Add a Comment:" : "Edit Comment:"}
          </label>
          <input
            className="w-full h-7 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="title"
            placeholder="Title"
            maxLength={100}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full h-20 mt-2 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment"
            placeholder=""
            maxLength={255}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center">
          <p>Rate: </p>
          <ReactStars
            className="px-2 pb-1"
            count={5}
            size={24}
            color2={"#ffd700"}
            value={rating}
            onChange={setRating}
          />
          <p>{rating}</p>
        </div>
        <div>
          <button
            className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
            type="submit"
          >
            {action === "post" ? "Comment" : "Edit"}
          </button>
          <button
            className="px-3 py-2 mx-2 text-sm text-blue-600 border border-blue-500 rounded"
            onClick={(e) => {
              e.preventDefault();
              setAddComment((state) => !state);
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
