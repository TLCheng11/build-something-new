import { useState } from "react";
import ReactStars from "react-stars";

function CommentForm() {
  const [rating, setrating] = useState<number>(0);

  return (
    <div className="max-w-lg rounded-lg shadow-md shadow-blue-600/50">
      <form action="" className="w-full p-4">
        <div className="mb-2">
          <label htmlFor="comment" className="text-lg text-gray-600">
            Add a Comment:
          </label>
          <textarea
            className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment"
            placeholder=""
            maxLength={255}
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
          <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">
            Comment
          </button>
          <button className="px-3 py-2 mx-2 text-sm text-blue-600 border border-blue-500 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
