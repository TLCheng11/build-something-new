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
      className={`grid ${
        type === "market" ? "grid-cols-3" : "grid-cols-2"
      } gap-10 p-10 h-full min-h-fit min-w-360px`}
    >
      {showProjects}
    </div>
  );
}

export default ProjectShowcase;
