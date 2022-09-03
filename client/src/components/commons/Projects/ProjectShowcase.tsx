import { useEffect, useState } from "react";
import { ICurrentUser, IProject } from "../../../Interface";
import ProjectCard from "./ProjectCard";

interface Props {
  currentUser: ICurrentUser;
}

function ProjectShowcase(props: Props) {
  const { currentUser } = props;
  const [myProjects, setmyProjects] = useState<[IProject]>([
    {
      id: 0,
      title: "",
      on_market: false,
      model_groups: [{ id: 0, group_name: "" }],
    },
  ]);

  const showMyProjects = myProjects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));

  useEffect(() => {
    fetch(`/users/${currentUser.id}/projects`)
      .then((res) => res.json())
      .then(setmyProjects);
  }, []);

  return (
    <div id="project-showcase" className="grid grid-cols-2 gap-10 p-10">
      {showMyProjects}
    </div>
  );
}

export default ProjectShowcase;
