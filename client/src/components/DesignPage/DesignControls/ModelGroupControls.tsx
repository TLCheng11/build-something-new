import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProject } from "../../../Interface";
import ModelPositionControls from "./ModelPositionContorls";
import ModelRotationControls from "./ModelRotationControls";

interface Props {
  setrefresh: Dispatch<SetStateAction<boolean>>;
  currentProject: IProject;
  selectedGroup: {
    id: number;
    name: string;
  };
  setselectedGroup: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    }>
  >;
  groupPosition: [number, number, number];
  setgroupPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  groupRotation: [number, number, number];
  setgroupRotation: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
}

function ModelGroupControls(props: Props) {
  const {
    setrefresh,
    currentProject,
    selectedGroup,
    setselectedGroup,
    groupPosition,
    setgroupPosition,
    groupRotation,
    setgroupRotation,
  } = props;
  const [groupName, setgroupName] = useState<string>("");
  const params = useParams();
  const [editName, seteditName] = useState<string>("");
  const [parentGroupId, setparentGroupId] = useState<number>(0);
  const [parentGroupName, setparentGroupName] = useState<string>("None");

  // options for group selection
  const groupList = currentProject.model_groups?.map((group) => (
    <option key={group.id} value={group.id}>
      {group.group_name}
    </option>
  ));

  // options for group attachment
  const assignList = currentProject.model_groups
    ?.filter((group) => group.id !== selectedGroup.id)
    .map((group) => (
      <option key={group.id} value={group.id}>
        {group.group_name}
      </option>
    ));

  useEffect(() => {
    if (assignList.length > 0) {
      setparentGroupId(assignList[0].props.value);
    }
  }, [assignList]);

  useEffect(() => {
    const currentGroup = currentProject.model_groups.filter(
      (group) => group.id === selectedGroup.id
    );
    if (currentGroup.length > 0) {
      setparentGroupName(currentGroup[0].parent_group_name || "None");
    }
  }, [currentProject, selectedGroup]);

  function createGroup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("/model_groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: params.project_id,
        group_name: groupName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setselectedGroup({ id: data.id, name: data.group_name });
            setgroupName("");
          });
        } else {
          res.json().then((message) => alert(message.errors));
        }
      })
      .catch(console.error);
  }

  function editGroupName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`/model_groups/${selectedGroup.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group_name: editName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setselectedGroup({ id: data.id, name: data.group_name });
            seteditName("");
          });
        } else {
          res.json().then((message) => alert(message.errors));
        }
      })
      .catch(console.error);
  }

  function attachToParentGroup() {
    fetch(`/model_groups/${selectedGroup.id}/attach`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent_group_id: parentGroupId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then(() => setrefresh((state: boolean) => !state));
        } else {
          res.json().then((message) => alert(message.error));
        }
      })
      .catch(console.error);
  }

  function detachFromParentGroup() {
    fetch(`/model_groups/${selectedGroup.id}/detach`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then(() => setrefresh((state: boolean) => !state));
        } else {
          res.json().then((message) => alert(message.error));
        }
      })
      .catch(console.error);
  }

  function deleteGroup() {
    if (selectedGroup.id > 0) {
      fetch(`/model_groups/${selectedGroup.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            res.json().then(() => {
              setselectedGroup({
                id: currentProject.model_groups[0].id,
                name: currentProject.model_groups[0].group_name,
              });
            });
          } else res.json().then((data) => alert(data.message));
        })
        .catch(console.error);
    }
  }

  return (
    <div className="h-full w-full py-2 mb-2 bg-gray-600 border-t border-b border-black">
      <div className="flex mb-2">
        <h1 className="mr-3">Group Controls:</h1>
        <button
          className="design-btn min-w-fit px-2 hover:bg-red-500"
          onClick={deleteGroup}
        >
          Delete Group
        </button>
      </div>
      {/* new group */}
      <div className="flex">
        <h1 className="w-1/3">New Group:</h1>
        <form onSubmit={createGroup}>
          <input
            className="design-input"
            name="group-name"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setgroupName(e.target.value)}
            required
          />
          <button className="design-btn" type="submit">
            Create
          </button>
        </form>
      </div>
      {/* group selection */}
      <div className="flex">
        <h1 className="w-1/3">Select Group:</h1>
        <select
          className="design-input"
          value={selectedGroup.id}
          onChange={(e) =>
            setselectedGroup({
              id: parseInt(e.target.value),
              name: e.target.options[e.target.selectedIndex].text,
            })
          }
        >
          {groupList}
        </select>
      </div>
      {/* edit group name */}
      <div className="flex">
        <h1 className="w-1/3">Group Name:</h1>
        <form onSubmit={editGroupName}>
          <input
            className="design-input"
            name="edit-group-name"
            placeholder={selectedGroup.name}
            value={editName}
            onChange={(e) => seteditName(e.target.value)}
            required
          />
          <button className="design-btn" type="submit">
            Edit
          </button>
        </form>
      </div>
      {/* group assignment */}
      <div className="flex">
        <h1 className="w-1/3">Parent Group:</h1>
        <p className="mx-2 w-150">{parentGroupName}</p>
        <button className="design-btn" onClick={detachFromParentGroup}>
          Detach
        </button>
      </div>
      <div className="flex">
        <h1 className="w-1/3">Attach to:</h1>
        <select
          className="design-input"
          value={parentGroupId}
          onChange={(e) => setparentGroupId(parseInt(e.target.value))}
        >
          {assignList}
        </select>
        <button className="design-btn" onClick={attachToParentGroup}>
          Attach
        </button>
      </div>
      <ModelPositionControls
        type="Group"
        position={groupPosition}
        setposition={setgroupPosition}
      />
      <ModelRotationControls
        type="Group"
        rotation={groupRotation}
        setrotation={setgroupRotation}
      />
    </div>
  );
}

export default ModelGroupControls;
