import { useContext, useState } from "react";
import ReactStars from "react-stars";
import { UserContext } from "../../contexts/UserContext";
import { IComment } from "../../Interface";
import CommentForm from "./CommentForm";

interface Props {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  comment: IComment;
}

function Comment({ setRefresh, comment }: Props) {
  const { currentUser } = useContext(UserContext);
  const [editing, setEditing] = useState<boolean>(false);

  function deleteComment() {
    fetch(`/comments/${comment.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setRefresh((state) => !state));
  }

  return editing ? (
    <CommentForm
      setRefresh={setRefresh}
      action="edit"
      setAddComment={setEditing}
      id={comment.id}
      currentComment={comment}
    />
  ) : (
    <div
      className={`m-2 px-3 py-1 border rounded-lg ${
        currentUser.id === comment.user.id && "bg-blue-300"
      }`}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full"
            src={
              comment.user.image_url ||
              "https://img.icons8.com/office/40/000000/test-account.png"
            }
          />
          <div className="ml-3">
            <h1 className="text-lg">{comment.user?.username}</h1>
            <div className="flex">
              <ReactStars
                count={5}
                color2={"#ffd700"}
                edit={false}
                value={comment.rating}
              />
              <p className="ml-2 pt-1 text-xs">
                {comment.updated_at.slice(0, 10)}
              </p>
            </div>
          </div>
        </div>
        {currentUser.id === comment.user.id && (
          <div className="flex">
            <img
              className="cursor-pointer h-7"
              src="https://img.icons8.com/nolan/64/edit--v1.png"
              onClick={() => setEditing(true)}
            />
            <img
              className="cursor-pointer h-7"
              src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"
              onClick={() => deleteComment()}
            />
          </div>
        )}
      </div>
      <div>
        <p className="text-md font-bold break-words">{comment.title}</p>
        <p className="px-2 break-words">{comment.comment}</p>
      </div>
    </div>
  );
}

export default Comment;
