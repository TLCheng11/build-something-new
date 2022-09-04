import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICurrentProject } from "../../../Interface";
import ModelPositionControls from "./ModelPositionContorls";
import ModelRotationControls from "./ModelRotationControls";

interface Props {
  setrefresh: Dispatch<SetStateAction<boolean>>;
  currentProject: ICurrentProject;
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
  const [parentGroup, setparentGroup] = useState<number>(0);

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
    if (assignList.length > 0 && parentGroup === 0) {
      setparentGroup(assignList[0].props.value);
    }
  }, [assignList]);

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
        parent_group_id: parentGroup,
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
    <div className="h-full w-full bg-gray-600 border">
      {/* new group */}
      <div className="flex">
        <h1>New Group:</h1>
        <form onSubmit={createGroup}>
          <input
            name="group-name"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setgroupName(e.target.value)}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
      {/* group selection */}
      <div className="flex">
        <h1>Select Group</h1>
        <select
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
        <button className="border" onClick={deleteGroup}>
          Delete
        </button>
      </div>
      {/* group assignment */}
      <div className="flex">
        <h1>
          Parent Group:
          {/* {
            currentProject.model_groups?.filter(
              (group) => group.id === selectedGroup.id
            )[0].parent_group_name
          } */}
        </h1>
        <button className="border" onClick={detachFromParentGroup}>
          Detach
        </button>
      </div>
      <div className="flex">
        <h1>Attach to Group:</h1>
        <select
          value={parentGroup}
          onChange={(e) => setparentGroup(parseInt(e.target.value))}
        >
          {assignList}
        </select>
        <button className="border" onClick={attachToParentGroup}>
          Attach
        </button>
      </div>
      {/* edit group name */}
      <div className="flex">
        <h1>Group Name:</h1>
        <form onSubmit={editGroupName}>
          <input
            name="edit-group-name"
            placeholder={selectedGroup.name}
            value={editName}
            onChange={(e) => seteditName(e.target.value)}
            required
          />
          <button type="submit">Edit</button>
        </form>
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
