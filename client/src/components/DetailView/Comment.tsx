import ReactStars from "react-stars";
import { IComment } from "../../Interface";

interface Props {
  comment: IComment;
}

function Comment({ comment }: Props) {
  return (
    <div className="m-2 px-3 py-1 border rounded-lg">
      <div className="flex justify-between">
        <h1>{comment.user?.username}</h1>
        <ReactStars
          count={5}
          color2={"#ffd700"}
          edit={false}
          value={comment.rating}
        />
      </div>
      <div>
        <p className="text-md font-bold">{comment.title}</p>
        <p className="px-2">{comment.comment}</p>
      </div>
    </div>
  );
}

export default Comment;
