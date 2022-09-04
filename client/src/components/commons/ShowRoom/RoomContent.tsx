import { useEffect, useState } from "react";
import { IModelGroup } from "../../../Interface";
import RoomGroup from "./RoomGroup";

interface Props {
  group: IModelGroup;
}

function RoomContent({ group }: Props) {
  return <RoomGroup group={group} />;
}

export default RoomContent;
