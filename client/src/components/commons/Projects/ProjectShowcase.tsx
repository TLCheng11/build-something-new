import { IProject } from "../../../Interface";
import ProjectCard from "./ProjectCard";

interface Props {
  setrefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  myProjects: [IProject];
}

function ProjectShowcase(props: Props) {
  const { setrefresh, type, myProjects } = props;

  const showMyProjects = myProjects.map((project) => (
    <ProjectCard
      key={project.id}
      setrefresh={setrefresh}
      type={type}
      project={project}
    />
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
