import { ICurrentUser, IProject } from "../../../Interface";
import ProjectCard from "./ProjectCard";

interface Props {
  type: string;
  myProjects: [IProject];
}

function ProjectShowcase(props: Props) {
  const { type, myProjects } = props;

  const showMyProjects = myProjects.map((project) => (
    <ProjectCard key={project.id} type={type} project={project} />
  ));

  return (
    <div
      id="project-showcase"
      className={`grid ${
        type === "market" ? "grid-cols-3" : "grid-cols-2"
      } gap-10 p-10 h-full min-h-720px min-w-360px overflow-auto`}
    >
      {myProjects[0].id !== 0 && showMyProjects}
    </div>
  );
}

export default ProjectShowcase;
