import { IProject } from "../../Interface";

interface Props {
  project: IProject;
}

function Reviews({ project }: Props) {
  console.log(project);

  return (
    <div id="reviews" className="flex flex-col justify-center h-fit w-full">
      <div className="h-full w-4/5 p-3 rounded-3xl border bg-white">
        <h1 className="text-3xl">{project.title}</h1>
        <p>{project.creator}</p>
        <p>Rating: 0</p>
      </div>
      <div className="max-w-lg rounded-lg shadow-md shadow-blue-600/50">
        <form action="" className="w-full p-4">
          <div className="mb-2">
            <label htmlFor="comment" className="text-lg text-gray-600">
              Add a review
            </label>
            <textarea
              className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
              name="comment"
              placeholder=""
            ></textarea>
          </div>
          <div>
            <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">
              Comment
            </button>
            <button className="px-3 py-2 text-sm text-blue-600 border border-blue-500 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
