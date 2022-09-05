import { IProject } from "../../Interface";

interface Props {
  project: IProject;
}

function Reviews({ project }: Props) {
  console.log(project);

  return (
    <div id="reviews" className="flex justify-center h-1/4 w-full">
      <div className="h-full w-4/5 p-3 rounded-3xl border bg-white">
        <h1 className="text-3xl">{project.title}</h1>
        <p>{project.creator}</p>
      </div>
    </div>
  );
}

export default Reviews;
