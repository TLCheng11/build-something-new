import { IProject } from "../../../Interface";
import ProjectCard from "./ProjectCard";

interface Props {
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  projects: IProject[];
  setShowProjectForm?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentProject?: React.Dispatch<React.SetStateAction<IProject>>;
}

function ProjectShowcase(props: Props) {
  const { setRefresh, type, projects, setShowProjectForm, setCurrentProject } =
    props;

  const showProjects = projects.map((project) => (
    <ProjectCard
      key={project.id}
      setRefresh={setRefresh}
      type={type}
      project={project}
      setShowProjectForm={setShowProjectForm}
      setCurrentProject={setCurrentProject}
    />
  ));

  return (
    <div
      id="project-showcase"
      className={`gap-10 p-10 h-full min-h-fit min-w-360px grid grid-cols-1 ${
        type === "market" ? "lg:grid-cols-3" : "lg:grid-cols-2"
      }`}
    >
      {showProjects}
    </div>
  );
}

export default ProjectShowcase;
