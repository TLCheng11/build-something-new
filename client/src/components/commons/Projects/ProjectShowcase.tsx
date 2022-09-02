import { useNavigate } from "react-router-dom";

interface Props {
  myProjects: [
    {
      id: number;
      title?: string | undefined;
    }
  ];
  setmyProjects: React.Dispatch<
    React.SetStateAction<
      [
        {
          id: number;
          title?: string | undefined;
        }
      ]
    >
  >;
}

function ProjectShowcase(props: Props) {
  let navigate = useNavigate();
  const { myProjects, setmyProjects } = props;

  const showMyProjects = myProjects.map((project) => (
    <div
      className="cursor-pointer"
      key={project.id}
      onClick={() => toProjectDesign(project.id)}
    >
      {project.title}
    </div>
  ));

  function toProjectDesign(id?: number) {
    navigate(`/project-design/${id}`);
  }

  return (
    <div
      id="project-showcase"
      className="grid grid-cols-2 gap-5 p-5 overflow-y-auto"
    >
      {showMyProjects}
    </div>
  );
}

export default ProjectShowcase;
