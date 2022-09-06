import { useContext, useState } from "react";
import ReactStars from "react-stars";
import { UserContext } from "../../contexts/UserContext";
import { IComment } from "../../Interface";
import CommentForm from "./CommentForm";

interface Props {
  setrefresh: React.Dispatch<React.SetStateAction<boolean>>;
  comment: IComment;
}

function Comment({ setrefresh, comment }: Props) {
  const { currentUser } = useContext(UserContext);
  const [editing, setediting] = useState<boolean>(false);

  return editing ? (
    <CommentForm
      setrefresh={setrefresh}
      action="edit"
      setaddComment={setediting}
      id={comment.id}
      currentComment={comment}
    />
  ) : (
    <div className="m-2 px-3 py-1 border rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            src={
              currentUser.profile_img ||
              "https://img.icons8.com/office/40/000000/test-account.png"
            }
          />
          <h1 className="text-lg mx-3">{comment.user?.username}</h1>
          <ReactStars
            count={5}
            color2={"#ffd700"}
            edit={false}
            value={comment.rating}
          />
        </div>
        <div className="flex">
          <img
            className="cursor-pointer h-7"
            src="https://img.icons8.com/nolan/64/edit--v1.png"
            onClick={() => setediting(true)}
          />
          <img
            className="cursor-pointer h-7"
            src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"
          />
        </div>
      </div>
      <div>
        <p className="text-md font-bold break-words">{comment.title}</p>
        <p className="px-2 break-words">{comment.comment}</p>
      </div>
    </div>
  );
}

export default Comment;
