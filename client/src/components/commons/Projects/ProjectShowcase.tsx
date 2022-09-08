import { IProject } from "../../../Interface";
import ProjectCard from "./ProjectCard";

interface Props {
  setrefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  projects: IProject[];
  setshowProjectForm?: React.Dispatch<React.SetStateAction<boolean>>;
  setcurrentProject?: React.Dispatch<React.SetStateAction<IProject>>;
}

function ProjectShowcase(props: Props) {
  const { setrefresh, type, projects, setshowProjectForm, setcurrentProject } =
    props;

  const showProjects = projects.map((project) => (
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
      } gap-10 p-10 h-full min-h-fit min-w-360px`}
    >
      {showProjects}
    </div>
  );
}

export default ProjectShowcase;
