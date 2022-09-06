import { IProject } from "../../../Interface";
import ProjectCard from "./ProjectCard";

interface Props {
  setrefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  myProjects: IProject[];
  setshowProjectForm?: React.Dispatch<React.SetStateAction<boolean>>;
  setcurrentProject?: React.Dispatch<React.SetStateAction<IProject>>;
}

function ProjectShowcase(props: Props) {
  const {
    setrefresh,
    type,
    myProjects,
    setshowProjectForm,
    setcurrentProject,
  } = props;

  const showMyProjects = myProjects.map((project) => (
    <ProjectCard
      key={project.id}
      setrefresh={setrefresh}
      type={type}
      project={project}
      setshowProjectForm={setshowProjectForm}
      setcurrentProject={setcurrentProject}
    />
  ));

  return (
    <div
      id="project-showcase"
      className={`grid ${
        type === "market" ? "grid-cols-3" : "grid-cols-2"
      } gap-10 p-10 h-full min-h-720px min-w-360px overflow-auto`}
    >
      {showMyProjects}
    </div>
  );
}

export default ProjectShowcase;
