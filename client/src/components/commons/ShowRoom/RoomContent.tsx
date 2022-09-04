import { useEffect, useState } from "react";
import { IModelGroup } from "../../../Interface";
import RoomGroup from "./RoomGroup";

interface Props {
  group: IModelGroup;
}

function RoomContent({ group }: Props) {
  const [childGroups, setchildGroups] = useState<IModelGroup[]>([]);

  // get all child groups
  useEffect(() => {
    fetch(`/model_groups/${group.id}`)
      .then((res) => res.json())
      .then((data) => setchildGroups(data.child_groups));
  }, [group]);

  return <RoomGroup group={group} />;
}

export default RoomContent;
